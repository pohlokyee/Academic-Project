# Tutorial 3: Image Classification Using CNN & Enhanced CNN Architecture

## 🎯 What this Tutorial Does
This project implements deep learning algorithms to automatically identify and categorize graphic image patterns from the CIFAR-10 computer vision dataset. It steps through pixel preprocessing and contrasts basic machine learning methods (ANNs) with deep learning systems (CNNs) before deploying an advanced, custom-tuned convolutional model that systematically eliminates prediction errors and pattern memorization.

## 🛠️ Technology Stack Used
* **Deep Learning Framework:** TensorFlow & Keras
* **Dataset Management:** CIFAR-10 open-source computer vision repository
* **Mathematical Operations:** NumPy
* **Data Visualization & Analytics:** Matplotlib & Seaborn
* **Model Regularization & Optimization:** Batch Normalization, Dropout Layers, and Adam Optimizer
* **Data Transformation Environment:** Keras `ImageDataGenerator`

## 🧠 Deep Learning Pipeline Stages

| Stage | Focus Area | Layer / Method Applied | Objective & Description |
| :--- | :--- | :--- | :--- |
| **1** | **Data Preprocessing** | Pixel Intensity Scaling | Divides pixel RGB numbers by 255.0 to normalize image data into a uniform smaller range between 0 and 1 for optimal network learning stability. |
| **2** | **Baseline Modeling** | Artificial Neural Network (ANN) | Flattens images into a single 1D vector and processes them through Dense layers, which drops spatial relationships and caps testing accuracy at 48%. |
| **3** | **Spatial Extraction** | Baseline CNN Framework | Integrates standard `Conv2D` filters and `MaxPooling2D` loops to automatically isolate spatial edges, increasing accuracy to 69.48% but leaving a 10.48% overfitting gap. |
| **4** | **Model Regularization** | Batch Normalization & Dropout | Adds normalization after every layer to balance features, plus dropouts (25% to 50%) to force alternative neural pathways and prevent absolute pattern memorization. |
| **5** | **Data Augmentation** | Keras `ImageDataGenerator` | Injects real-time horizontal flips, shifts, rotations, and zooms in memory during runtime to drastically reduce the model overfitting gap to 1.37% and lift accuracy to 76.20%. |

---

## 📑 Personal Reflection

### Poh Lok Yee
This tutorial offered an insightful, step-by-step lesson in deep learning design and model optimization. Working independently to enhance the baseline network model using deeper convolutional structures, batch normalization, dropout regulars, and image data augmentation gave me an active, analytical understanding of neural network parameters. A major takeaway for me was realizing that tracking the overfitting gap is just as critical as monitoring overall accuracy. Watching the validation gap drop from a steep 10.48% down to 1.37% after introducing regularization proved that deliberate architectural changes are essential to building highly generalized models.
