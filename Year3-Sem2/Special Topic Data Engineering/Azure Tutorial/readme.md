# Tutorial: End-to-End Azure Cloud Data Engineering Pipeline

## ☁️ Architecture & Data Lineage Flow Design
The data framework acts as an end-to-end cloud pipeline, mapping raw on-premises infrastructure into actionable business intelligence metrics via the Microsoft Azure ecosystem:

* **Step 1: Automated Lookup Loop (Azure Data Factory)**
  ADF uses a relational query loop to parse source table directories and trigger a parameterized ingestion cascade across local storage networks via a Self-Hosted Integration Runtime (SHIR).
* **Step 2: Raw Extraction Storage (Bronze Landing Zone)**
  Data drops directly into ADLS Gen2 object storage containers, maintaining unaltered raw transaction states inside high-performance binary Parquet storage.
* **Step 3: Schema Conformance & Standard Cleaning (Silver Transformation Layer)**
  Azure Databricks PySpark nodes spin up to filter out record breaks, unify non-conforming system timestamps, and fill empty cell constraints.
* **Step 4: Business Logic Enforcements (Gold Analytical Layer)**
  Databricks scripts handle deep dimensional processing, grouping key revenue matrices and organizing table architectures to match formal star schemas.
* **Step 5: High-Performance Logical Layering (Azure Synapse Serving Layer)**
  Exposes the physical Gold files directly via high-speed, query-optimized SQL Views, protecting system data lineage patterns without duplicating files.
* **Step 6: Metric Visualization Panels (Microsoft Power BI)**
  The final reporting application attaches directly to the Synapse views to build real-time interactive cross-filtering dashboard layouts for organizational stakeholders.

---

## 📑 Personal Reflection

### Poh Lok Yee
This project made the functional realities of building an enterprise cloud infrastructure highly tangible, moving past purely theoretical concepts. Implementing the end-to-end cloud pipeline required a significant amount of extra time dedicated to fine-tuning service configurations and debugging unexpected pipeline errors. Specifically, diagnosing data movement failures through the Self-Hosted Integration Runtime and fixing workflow breaks in Databricks notebooks helped me appreciate the rigorous environment tuning required to keep real data systems operational. Ultimately, fixing these unscripted issues significantly built up my engineering problem-solving capacity and practical cloud skills.