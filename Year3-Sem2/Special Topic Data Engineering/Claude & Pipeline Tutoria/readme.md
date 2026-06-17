# Tutorial 4: AI-Assisted Data Engineering Pipeline with Apache Airflow & Claude Haiku

## 🤖 System Use Case & Pipeline Flow Overview
This diagram outlines how natural language artificial intelligence agents are safely coupled alongside rigid, rule-based data systems to execute automated data pipeline quality orchestration:

[ Data Source ] ──> Step 1: Extract ──> Step 2: Load Staging Zone ──> Step 3: Invoke Airia API
                                                                              │
┌─────────────────────────────────────────────────────────────────────────────┘
▼
Step 4: Claude Haiku 4.5 Orchestrated Evaluation Stages
 ├── 📊 Stage A: Dataset Profiling (Structure inspection & layout parsing)
 ├── 🔍 Stage B: Quality Issue Detection (Anomalies classified as Critical/Warning/Info)
 └── 📄 Stage C: Contextual Summary Generation (Markdown diagnostic reporting logs)
                                                                              │
┌─────────────────────────────────────────────────────────────────────────────┘
▼
Step 5: Local Pandas Transformation ──> [ Drop 9 Corrupted Rows ] ──> Step 6: Export Clean Dataset

---

## 📑 Personal Reflection

### Poh Lok Yee
This tutorial provided an excellent look into how modern pipelines use intelligent language models to handle data quality inspections rather than manually written validation rules. Using Apache Airflow and Directed Acyclic Graphs (DAGs), it was highly impressive to see how the Claude Haiku 4.5 agent successfully detected complex dataset flaws like formatting inconsistencies and impossible values using plain text prompts.

The primary hurdle involved platform integrations—specifically, configuring the Airflow operators to properly map request headers and payloads to the external Airia API, which threw up tricky connection mismatches initially. Furthermore, we had to re-evaluate our pipeline logic after realizing the AI shouldn't stop the pipeline upon identifying flaws, but should handle flexible reporting instead. This allowed our deterministic `pandas` script to execute the strict cleaning rules, resulting in a successful hybrid workflow that reduced our messy dataset down to 51 clean rows in a 34.59-second run.
