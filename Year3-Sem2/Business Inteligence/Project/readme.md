# Retail Strategy: The Impact of GDP and Urbanization on European Sales

## Project Overview
This repository contains the Business Intelligence (BI) project developed by group **lilPotato** for the **Business Intelligence (SECP3213)** course at **Universiti Teknologi Malaysia (UTM)**. 

The project focuses on a retail company operating across Europe that sells products through both online and offline channels. While internal transactional sales records provide clear histories, they fail to explain the external socio-economic and demographic factors that drive customer buying behavior. To bridge this gap, this project integrates internal sales logs with external macroeconomic indicators—specifically country wealth (Nominal GDP) and urbanization rates—to help the organization shift from reactive reporting to a proactive, data-driven market expansion strategy.

### Project Objectives:
* **Data Integration:** Combine internal European sales records with external data on country wealth (GDP) and city living factors (Urbanization) into a single, cohesive dataset.
* **Behavioral Analysis:** Determine if there is a distinct connection between a country's economic standing (GDP per capita) or urbanization rate and whether its citizens prefer online shopping over offline retail.
* **Interactive Visualizations:** Build a comprehensive dashboard using Microsoft Power BI to clearly visualize sales trends, filtering metrics easily by wealth, country, and living environment.
* **Strategic Recommendations:** Deliver data-backed advice on which European markets should receive investments for expanding brick-and-mortar stores versus which regions should focus heavily on digital e-commerce scaling.

---

## Data Architecture & BI Pipeline
The project utilizes a structured end-to-end BI pipeline split into a backend ETL layer and a frontend visualization layer.

### 1. Backend ETL & Data Engineering (Alteryx Designer)
We use **Alteryx Designer** as our primary data orchestration engine to clean, transform, and merge three distinct structured CSV datasets:
* **Dataset 1 (Internal Europe Sales Records):** Tracks sales channels, product types, order quantities, revenues, and profit metrics.
* **Dataset 2 (Global GDP Explorer 2025):** Collects global economic indicators reflecting national economic health, nominal GDP, and GDP per capita values.
* **Dataset 3 (Countries of the World 2023):** Provides demographic baselines including urban population percentages, density, and consumer price indexes (CPI).

**Alteryx Process Breakdown:**
* **Data Cleansing:** Handling null values, stripping trailing spaces, and re-typing string-based currency or percentage indicators into pure numeric fields for mathematical operations.
* **Data Integration:** Performing a relational join on individual datasets using `Country` as the common primary key to form a comprehensive master file.
* **KPI Derivation:** Creating calculated metrics via the Alteryx Formula Tool—such as *Profit per Urban Resident*—to serve as normalized KPIs for evaluating market potential.

### 2. Frontend Analytics & Visual Dashboards (Microsoft Power BI / Tableau)
The clean, processed output from Alteryx is fed into the visualization layer to construct an executive decision dashboard. The dashboard translates the combined data into interactive, easy-to-read visual stories, allowing users to analyze correlations between national wealth, urbanization density, and historical retail shopping channel preferences.

