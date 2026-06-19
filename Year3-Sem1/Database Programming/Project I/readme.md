# Relational Database Architecture for Pet Hospital Clinic Systems

## 🎯 Project Overview
This repository contains the full engineering implementation of a relational database architecture developed for a **Pet Hospital System (Veterinary Clinic Management Platform)**. The system automates customer records management, medical data ingestion, vet scheduling, and operational tracking workflows.

By applying structured **Data Definition Language (DDL) and Data Manipulation Language (DML)** workflows, the platform resolves critical operational challenges surrounding real-time data lookups—specifically ensuring that complex pet medical history remains instantly available during critical clinical emergencies.

---

## 🛠️ Technology Stack Used
* **Database Compute Engine:** MySQL Server
* **Design & Optimization:** MySQL Workbench[cite: 2]
* **Query Standards:** SQL (Structured Query Language - ANSI compliant)
* **Architecture Paradigms:** Relational Data Model with Referential Integrity Constraints

---

## ☁️ System Architecture & Data Lineage Flow

The backend implementation structures data sequentially across distinct relational files to ensure ACID compliance, total referential consistency, and optimal search speeds[cite: 3].

| Step | Phase / Layer | Technical Component | Objective & Description |
| :--- | :--- | :--- | :--- |
| **1** | **Structural Creation** | Data Definition Layer (`P1_DDL.sql`)[cite: 3] | Generates the schema blueprint, implementing five foundational core tables (*Owner, Vet, Pet, Appointment, Medical_Record*)[cite: 3]. |
| **2** | **Integrity Enforcement** | Relational Constraint Tier[cite: 3] | Hooks dependencies together using strict `PRIMARY KEY`, `FOREIGN KEY`, `NOT NULL`, and `UNIQUE` rule constraints[cite: 3]. |
| **3** | **Data Seed & Ingestion** | Data Manipulation Layer (`P2_DML.sql`)[cite: 3] | Populates the base structures with realistic data lines, managing updates and safe deletion dependency flows[cite: 3]. |
| **4** | **Complex Analytics Engine** | Data Query Layer (`P3_DQL.sql`)[cite: 3] | Runs relational joins, string logic operations, subqueries, and grouping logic to pull deep operational insight[cite: 3]. |
| **5** | **Range Query Optimization** | B-Tree Performance Index (`idx_appt_date`)[cite: 3] | Optimizes range filters over targeted time boundaries, reducing search steps from whole-table loops down to narrow boundaries[cite: 3]. |
| **6** | **Unstructured Text Processing** | Full-Text Search Index (`idx_medical_text`)[cite: 3] | Introduces text mining tokens across wide clinical rows (*diagnosis, treatment, notes*) using high-speed keyword arrays[cite: 3]. |
