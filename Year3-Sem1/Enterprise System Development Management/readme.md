# Enterprise Architecture and System Integration Design for UTHM Student Housing Platform

## 🎯 Project Overview
This repository contains the full enterprise architecture design and integrated system framework developed for **Universiti Tun Hussein Onn Malaysia (UTHM)**. The system centralizes and automates fragmented residential university services into a single, cohesive, digital platform.

By applying structured **Enterprise Architecture (EA) Principles** alongside a sequential development lifecycle, the platform resolves critical operational liabilities surrounding **Data Silos** and **System Fragmentation**—specifically bridging disjointed departmental applications while managing student residency lifecycles down to central administrative master systems.

---

## 🛠️ Technology Stack Used
* **Integration Middleware:** SAP Business Technology Platform (BTP) / SAP Integration Suite
* **Analytical Storage:** SAP HANA Cloud Database Engine
* **Rapid Prototyping Platform:** SAP Build Apps (Low-Code/No-Code)
* **Design & Experience Blueprinting:** Figma High-Fidelity Vector Environment
* **Alternative Cloud Infrastructure:** Microsoft Power Apps / Dataverse Ecosystem

---

## ☁️ System Architecture & Data Lineage Flow

The platform coordinates university processes sequentially across four decoupled blueprint layers to maximize structural consistency, cross-department alignment, and secure operational workflow tracing.

| Step | Phase / Layer | Technical Component | Objective & Description |
| :--- | :--- | :--- | :--- |
| **1** | **Unified Authentication** | Technology Layer (myUTHM Profile / UTHM SSO) | Secures initial user entry boundaries, granting single sign-on verification across connected university sectors. |
| **2** | **Interoperable Brokerage** | Technology Layer (API / Integration Suite Platforms) | Brokers real-time system events, preventing isolated departmental application locks. |
| **3** | **Master System Reference** | Data Layer (SMP Student Master & Finance/Bursary Systems) | References student data, academic states, and financial outstanding balance parameters from central tables. |
| **4** | **Modular Business Logic** | Application Layer (Hostel Application, Check-In, Maintenance Modules) | Implements target university functional processes (*Room Allocation, Damage Logs, Ticket Assignments*). |
| **5** | **Strategic Capability Execution** | Business Layer (Student Housing & Residential Services Management) | Executes campus capabilities matching university strategic visions of a fully integrated Smart Campus. |
| **6** | **Role-Customized Interface** | Presentation Layer (Web Portal UI & Figma Prototypes)| Renders customized data panels designed for three target actors (*Students, Administrative Staff, Technicians*). |

---
