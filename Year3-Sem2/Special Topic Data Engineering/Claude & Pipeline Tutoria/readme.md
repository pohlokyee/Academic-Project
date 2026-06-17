# Tutorial 4: AI-Assisted Data Engineering Pipeline with Apache Airflow & Claude Haiku

## 🎯 What this Tutorial Does
This project builds an automated hybrid data validation pipeline orchestrated by Apache Airflow. Instead of relying on rigid, manually coded parameters to check dataset cleanliness, it embeds a natural language AI agent platform (Claude Haiku 4.5) straight into the data stream to read files contextually, profile layouts, detect multi-tiered anomaly severities, and generate actionable engineering logs.

## 🛠️ Technology Stack Used
* **Workflow Orchestration Engine:** Apache Airflow (Directed Acyclic Graphs / DAGs)
* **LLM Engine Platform:** Airia AI Agent Platform
* **Cognitive AI Model Platform:** Anthropic Claude Haiku 4.5 via Secure REST API Operators
* **Data Engineering & Clean-Up Library:** Python `pandas`
* **Programming Environment:** Python Local Runtimes & OS Environment Variables Management

## 🤖 Orchestration & Evaluation Pipeline Stages

| Stage | Task ID / Block | Technology Stack | Core Functional Role & Description |
| :--- | :--- | :--- | :--- |
| **1** | `extract_data` | Apache Airflow Operator | Automatically unzips and verifies the local directory pathing for the incoming, unverified source dataset (`customer_data.csv`). |
| **2** | `load_data` | Python / Staging Folder | Replicates and isolates the raw, unverified data payload strings into a clean local staging area directory to protect raw pipeline lineage. |
| **3** | Dataset Profiling | Airia Agent / Claude Haiku 4.5 | Examines the unverified dataset structure to dynamically parse data layouts, map basic column types, and evaluate total record numbers. |
| **4** | Issue Detection | Airia Agent / Claude Haiku 4.5 | Contextually inspects text rows to flag missing cells, duplicate IDs, invalid emails, and bad spending numbers, grading issues as Critical, Warning, or Info. |
| **5** | Report Generation | Airia Agent / Claude Haiku 4.5 | Translates technical errors into a highly concise Markdown diagnostic report log, outlining priority recommendations without breaking the automated flow. |
| **6** | `transform_data` | Python `pandas` Script | Executes repeatable data transformations using deterministic clean-up rules based on the AI inspection (dropping 9 corrupted rows to deliver 51 clean rows). |

---

## 📑 Personal Reflection

### Poh Lok Yee
This tutorial perfectly demonstrated how modern workflows are moving past rigid, hardcoded data rules toward intelligent, context-aware LLM inspections. Orchestrating task dependencies in Apache Airflow showed me exactly how datasets move safely between cloud platforms and local systems. While configuring the Airflow operators to map payload schemas and API keys to the external Airia platform caused some tricky connection mismatches initially, it highlighted critical lessons in cloud integration. Furthermore, I learned that a robust pipeline should use the AI model strictly for flexible reporting, leaving the deterministic dataset cleaning to programmatic tools like `pandas`, resulting in a highly successful hybrid framework.
