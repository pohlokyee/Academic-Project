# Tutorial 3: Image Classification Using CNN & Enhanced CNN Architecture

## 🧠 Pipeline Workflow Overview
This project maps out an incremental optimization framework for deep learning architectures:

> **Step 1: Dataset Normalization**
> * Pixel structures are isolated and adjusted from their raw 0-255 scale into a uniform decimal range between 0 and 1.
> * This stabilizes gradient descents and optimizes neural training performance over continuous execution loops.

> **Step 2: Baseline Multi-Layer Perceptron Evaluation (ANN)**
> * Input data undergoes structural flattening directly into an elementary one-dimensional vector space.
> * The system executes training via standard Dense layers, discarding essential spatial data boundaries and hitting an accuracy floor of 48%.

> **Step 3: Shallow Feature Extraction (Baseline CNN)**
> * Incorporates structured two-dimensional feature filters (`Conv2D`) and down-sampling pooling loops (`MaxPooling2D`).
> * Automatically isolates basic edge vectors, lifting performance metrics to 69.48% but introducing a rigid 10.48% overfitting gap.

> **Step 4: Architectural Scaling & Regularization (Enhanced CNN)**
> * Expands the depth parameters to six unique convolutional layers running filter arrays that scale linearly from 32 to 128.
> * Integrates explicit `BatchNormalization` zones alongside aggressive random parameter drops (`Dropout` bounds of 25% to 50%).

> **Step 5: Random In-Memory Transformations (Data Augmentation)**
> * Deploys real-time image shifts, zooms, flips, and rotations using Keras `ImageDataGenerator` functions.
> * Forces the network parameters to extract generalized patterns rather than memorizing localized coordinates, lowering the model overfitting gap to 1.37% and raising test accuracy to 76.20%.

---

## 📑 Personal Reflection

### Poh Lok Yee
This project was an insightful lesson in incremental model optimization, taking us from a basic ANN to a baseline CNN, and finally to an enhanced CNN architecture. Working independently on Section 4.0 was highly rewarding. It required diagnosing baseline limitations and applying targeted strategies—such as expanding convolutional layers, batch normalization, dropout, and data augmentation (`ImageDataGenerator`) to build a practical understanding of deep learning behaviors. 

An invaluable architectural takeaway was that model evaluation cannot rely on accuracy alone; tracking the overfitting gap is equally crucial. Seeing our overfitting gap drop from 10.48% to just 1.37% after applying regularization proved that deliberate structural changes are key to making a model truly generalize to new, unseen testing data.
