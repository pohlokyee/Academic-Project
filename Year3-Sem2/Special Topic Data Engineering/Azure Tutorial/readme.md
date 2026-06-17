# Tutorial: End-to-End Azure Cloud Data Engineering Pipeline (Medallion Architecture)

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
The project made me realize the functionality of a complete data engineering pipeline in more than theoretical terms. Although the tutorial appeared simple and just a few hours, but I encountered a few problems when implementing it, especially the service configuration and pipeline errors, which did not necessarily work as expected and took me few days to complete it. I wasted precious time in debugging issues like data movement failure and minor errors in the workflow that led to the pipeline breaking. These issues helped me to understand that it takes time and many efforts to create a working system. It was an experience that enhanced my problem-solving abilities and demonstrated that true learning occurs when you are solving an unexpected problem rather than following the instructions.
