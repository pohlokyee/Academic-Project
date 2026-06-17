# Tutorial 1: End-to-End Azure Cloud Data Engineering Pipeline (Medallion Architecture)

## 🛠️ Technology Stack Used
* **Orchestration:** Azure Data Factory (ADF)
* **Storage Layers:** Azure Data Lake Storage Gen2 (ADLS Gen2)
* **Compute / Transformation:** Azure Databricks (PySpark Notebooks)
* **Data Warehousing & Serving:** Azure Synapse Analytics (Serverless SQL Pools)
* **Business Intelligence / Analytics:** Microsoft Power BI
* **Local Ingestion Agent:** Self-Hosted Integration Runtime (SHIR)

## ☁️ Architecture & Data Lineage Flow Design

| Step | Phase / Layer | Technical Tool Used | Objective & Description |
| :--- | :--- | :--- | :--- |
| **1** | **Automated Ingestion** | Azure Data Factory (ADF) | Uses a `Lookup` and `ForEach` loop to extract table name lists from an on-premises SQL Server via a Self-Hosted Integration Runtime (SHIR). |
| **2** | **Raw Data Landing** | Bronze Layer (ADLS Gen2) | Securely stores an exact, unaltered raw copy of the source data formatted as high-performance Parquet files. |
| **3** | **Data Cleaning** | Silver Layer (Azure Databricks) | Executes PySpark notebooks to handle complex date formats, remove empty rows, and enforce consistent column naming conventions. |
| **4** | **Data Enrichment** | Gold Layer (Azure Databricks) | Applies business logic rules and data aggregations to transform structured tables into optimized analytical star schema layouts. |
| **5** | **Data Serving** | Azure Synapse Analytics | Generates serverless SQL Views over the Gold container files, allowing direct querying without copying data back and forth. |
| **6** | **Data Visualization**| Microsoft Power BI | Connects securely to Synapse to turn raw business data into an interactive, cross-filtered Sales Performance KPI Dashboard. |

---

## 📑 Personal Reflection

### Poh Lok Yee
This project made the functional realities of enterprise cloud architecture highly tangible, moving past purely theoretical concepts. Implementing the pipeline required a significant amount of extra time dedicated to fine-tuning service configurations and independently debugging errors. Specifically, diagnosing data movement failures through the Self-Hosted Integration Runtime and fixing workflow breaks in Databricks notebooks helped me appreciate the rigorous environment tuning required to keep real data systems operational. Ultimately, resolving these unexpected bugs drastically enhanced my practical engineering and problem-solving skills.
