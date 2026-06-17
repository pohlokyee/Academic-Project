# Tutorial 2: Apache Spark ETL Pipeline

## 🎯 What this Tutorial Does
This project constructs a high-performance big data pipeline designed to ingest and process a massive 2.2GB Brazilian National Basic Education Census dataset. It extracts unnormalized historical data across 12 years, heavily compresses it for performance optimization, flattens the tables into a multi-dimensional star schema for analytics, and loads millions of rows into a production relational database server.

## 🛠️ Technology Stack Used
* **Core Engine:** Apache Spark / PySpark
* **Virtualization & Environments:** Docker & Docker Compose
* **Relational Database Server:** PostgreSQL
* **Database Management UI:** Adminer
* **Database Connectivity Driver:** Python `psycopg2` (JDBC Client execution)
* **BI & Data Analytics:** Metabase

## 🛠️ Project Execution Steps

| Step | Phase / Layer | Technical Execution | Objective & Description |
| :--- | :--- | :--- | :--- |
| **1** | **Ingestion & Compression** | PySpark DataFrame API | Reads raw, semicolon-delimited Brazilian school census CSV text data and writes it out into a single compressed binary Parquet file (~5x storage savings). |
| **2** | **Dimensional Modeling** | PySpark Operations | Restructures and deconstructs an unnormalized flat dataset containing 370 raw columns into a multi-dimensional Star Schema structure. |
| **3** | **Database Migration** | Spark JDBC Connector | Connects to the target server to write and append approximately 2.79 million fully transformed fact records into the production system database. |
| **4** | **Constraint Handling** | Python `psycopg2` Driver | Establishes a direct link with the PostgreSQL Database Server to manually execute SQL scripts for adding primary keys and descriptive constraints. |
| **5** | **BI Dashboarding** | Metabase App Connection | Connects directly to the analytics-ready PostgreSQL database server schemas to construct interactive business trend charts and map graphs. |

---

## 📑 Personal Reflection

### Poh Lok Yee
This tutorial provided excellent hands-on exposure to an end-to-end big data pipeline. Processing a 2.2GB dataset with 2.79 million rows clearly showed the power of distributed tools like Apache Spark, while using `psycopg2` separately to enforce primary key constraints highlighted how different engineering tools must complement one another. Setting up the environment on Windows presented multiple unscripted challenges, including fixing `wget` script incompatibilities, adjusting encoding schemas to `iso-8859-1`, and resolving outdated container issues with Metabase. Overcoming these hurdles taught me how to write highly precise AI prompts for system diagnostics, while collaborating in a group allowed us to share technical solutions effectively.
