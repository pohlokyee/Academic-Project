# Tutorial 2: Apache Spark ETL Pipeline

## 🛠️ Project Execution Steps
Below is the sequential breakdown of how data moves from raw files into the final business intelligence layer:

| Step | Phase | Technical Execution | Objective |
| :--- | :--- | :--- | :--- |
| **1** | **Ingestion & Compression** | Using PySpark to read raw text and write to binary columnar format. | Converts 2.2GB of messy CSV data into optimized Parquet files (~5x compression). |
| **2** | **Dimensional Modeling** | Restructuring unnormalized flat data schemas via Spark DataFrame operations. | Decomposes 370 raw columns into a centralized Star Schema (1 Fact + 12 Dimension tables). |
| **3** | **Database Migration** | Establishing a secure network bridge to dump records into production tables. | Appends 2.79 million fully transformed records into a PostgreSQL Database Server via JDBC. |
| **4** | **Constraint Handling** | Spawning a native database cursor via Python relational database drivers. | Connects via `psycopg2` to explicitly apply standard DDL constraints like Primary Keys. |
| **5** | **BI Dashboarding** | Connecting analytics-ready database schemas directly to visualization software. | Generates interactive historical trend visualizations using a Metabase dashboard. |

---

## 📑 Personal Reflection

### Poh Lok Yee
This tutorial provided a powerful, hands-on demonstration of how data moves within a real ETL pipeline system using Apache Spark. Processing 2.2GB of raw CSV data, converting it to Parquet, and loading 2.79 million rows into PostgreSQL made it clear why Spark is essential for big data engineering[cite: 3]. A key technical takeaway was seeing how different tools complement each other—such as using Spark to write the data, but relying on `psycopg2` to separately execute `ALTER TABLE` commands for setting primary keys. 

The setup on Windows brought several environment hurdles, including fixing `wget` incompatibilities, shifting file encoding to `iso-8859-1`, and troubleshooting a PostgreSQL compatibility issue that caused Metabase to fail on startup[cite: 3]. Overcoming these challenges taught me how to construct precise AI diagnostics prompts and individual research workflows[cite: 3]. Collaborating as a group by splitting tasks along CRISP-DM phases allowed us to build deep specialized knowledge while maintaining active communication to share cross-functional solutions whenever bugs appeared.