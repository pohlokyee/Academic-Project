# End-to-End Azure Cloud Data Engineering Pipeline for PPG Inventory Risk Analytics

## 🎯 Project Overview
This repository contains the full engineering implementation of a scalable, cloud-native data pipeline developed for **PPG Industries**. The system automates the ingestion, quality enforcement, algorithmic transformation, and multi-grain dimensional modeling of enterprise manufacturing datasets. 

By applying a structured **Medallion Architecture**, the platform resolves critical operational challenges surrounding **Recoverable Assets (RA)** and **Inventory Risk Management (IRM)**—specifically tracking capital tied up in obsolete or expired materials and dynamically tracing raw resource stockouts down to active B2B customer sales orders.

---

## 🛠️ Technology Stack Used
* **Orchestration:** Azure Data Factory (ADF)
* **Storage Infrastructure:** Azure Data Lake Storage Gen2 (ADLS Gen2)
* **Compute / Processing Engine:** Azure Synapse Analytics (Serverless SQL Pools)
* **Business Intelligence / Semantic Tier:** Microsoft Power BI
* **Security & Credential Management:** Azure Key Vault

---

## ☁️ System Architecture & Data Lineage Flow

The pipeline moves data sequentially through three refined layers to guarantee absolute data integrity, performance scalability, and on-demand calculation capabilities.

| Step | Phase / Layer | Technical Component | Objective & Description |
| :--- | :--- | :--- | :--- |
| **1** | **Automated Ingestion** | Azure Data Factory (`pl_bronze_ingestion`) | Extracts and moves 6 operational source datasets (*materials, snapshots, purchase orders, production orders, suppliers, sales orders*) in parallel. |
| **2** | **Raw Landing & QA Guardrails** | Bronze Layer (ADLS Gen2 & ADF Data Flows) | Preserves raw immutable states while running a quality check (`df_bronze_quality`). Corrupted lines or duplicate natural keys are shunted to a **Quarantine directory**, while valid data enters **Validated**. |
| **3** | **Business Logic Calculation** | Silver Layer (Azure Synapse Serverless Views) | Implements complex supply chain algorithms (`vw_silver_ra_mc_logic` and `vw_silver_stockout_risk`) across storage text streams utilizing an operational benchmark date of **March 31, 2026**. |
| **4** | **Analytical Data Modeling** | Gold Layer (Azure Synapse Serverless Views) | Reshapes distinct flat schemas into a unified, high-performance **Galaxy Schema (Fact Constellation)** sharing conformed dimension views. |
| **5** | **Semantic Data Serving** | Azure Synapse SQL Views | Exposes optimized multi-grain reporting endpoints (`fact_inventory_status` and `fact_sales_impact`) directly to downstream applications with zero storage overhead. |
| **6** | **Operational Visualization** | Microsoft Power BI | Consumes Serverless endpoints via robust, customized `TREATAS` DAX filtering rules to display an interactive Inventory Health Dashboard. |

---

## ⚙️ Core Architecture Implementations

### 1. Bronze Quality Infrastructure (`df_bronze_quality`)
To prevent corrupt data from breaking downstream processing, the pipeline runs automated validation logic:
* **Null Pointer Interception:** Validates presence of mandatory business keys (e.g., `material_id`) utilizing validation flags: `iif(isNull(material_id), 1, 0)`.
* **Deduplication Matrix:** Evaluates incoming natural primary combinations (such as `snapshot_date + material_id`). Duplicate indices tracking an aggregate row volume $>1$ are systematically split out into isolated error tables.

### 2. Silver Processing Engine
Because local execution environment constraints limited dedicated active Spark notebook compute pools, the transformations were engineered using highly performant, on-demand **Serverless SQL Views**:
* **Recoverable Assets (RA) Logic:** Identifies over-allocated working capital by cross-referencing on-hand stock volumes against a rolling 12-month historical factory consumption rate.
* **Magna Carta (MC) Framework:** Flags severe financial liabilities by capturing **Dead Stock** (zero production utilization for $\ge 9$ consecutive months) and **Expired Stock** past lot shelf-life boundaries, instantiating an immediate 100% accounting write-down provision
* **Stockout Risk & Downstream Trace:** Evaluates remaining asset lifespans ("Stock Cover Days") against specific vendor replenishment constraints ("Lead Time"). If stock cover drops below lead times, it trips a risk flag (`is_stockout_risk = 1`) and resolves relational joins down the supply chain tree:
$$\text{Raw Material Shortage} \rightarrow \text{Impacted Production Line} \rightarrow \text{Delayed Finished Good} \rightarrow \text{Affected Open Sales Order} \rightarrow \text{End Customer Name}$$

### 3. Gold Galaxy Schema Design
The analytics layer hosts a **Fact Constellation Schema** sharing conformed dimension lookups (`dim_material`, `dim_date`, `dim_warehouse`) to allow cross-functional, synchronized filtering across two decoupled reporting grains:
* `fact_inventory_status`: Tracks inventory balances, rolling usage velocities, and Magna Carta financial provision metrics.
* `fact_sales_impact`: Focuses on delivery schedules, unfulfilled order lines, and active customer shipment risks.

---

## 📑 Project Contributors & Personal Reflections
### Poh Lok Yee
 "This project completely changed how I look at data engineering. Building the Medallion Architecture taught me how data is cleaned and improved step-by-step in the cloud. I learned how messy, raw data in the Bronze layer gets filtered, standardized into clean business logic in the Silver layer, and finally structured into a powerful data model in the Gold layer.

 Working on this real-world case study for PPG showed me how actual cloud pipelines function when facing unexpected challenges. When we ran into system memory and compute limits with Spark notebooks, we had to adapt quickly. We pivoted to writing efficient SQL views directly over our data lake using Azure Synapse Serverless pools instead. This taught me how to problem-solve on the spot, catch corrupted data with quarantine folders, and turn messy files into valuable business insights that protect customer deliveries and save company money."
