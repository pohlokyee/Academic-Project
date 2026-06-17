# Tutorial 3: Image Classification Using CNN & Enhanced CNN Architecture

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
This tutorial was not just about getting a model to run successfully, but also about understanding the process of improving it step by step. Starting from a basic ANN, then moving to a baseline CNN, and finally working through enhancing the CNN with deeper layers, regularization, and data augmentation gave a much more complete picture of how model development actually works in practice. Each stage built on the previous one, making it easier to see how each change contributed to better and more reliable classification results overall.

The most challenging yet rewarding part of this tutorial was working on Section 4.0 independently. Identifying the limitations of the baseline model and then applying targeted improvements such as adding more convolutional layers, introducing batch normalization and dropout, and using data augmentation required more than just writing code. It required understanding the reasoning behind each decision and observing how each change affected the model behaviour. This process helped build a more practical and analytical way of thinking about model development.

One important lesson learned from this tutorial is that evaluating a model should not rely on accuracy alone. Initially, the tendency was to only look at whether the accuracy number increased as the main indicator of improvement. However, through working on the comparison between the baseline and enhanced CNN, it became clear that the overfitting gap is equally important to consider. A model can show a high training accuracy while still performing poorly on new images, which means it has memorized the training data rather than truly learned from it. Seeing the overfitting gap reduce from 10.48% to just 1.37% after applying regularization techniques made this lesson much more concrete and easier to appreciate through actual results rather than theory alone. This tutorial strengthened knowledge in deep learning model design, evaluation, and improvement. The experience of building, comparing, and analyzing two different CNN models also developed a better appreciation for how small but deliberate architectural changes can lead to meaningful improvements in real-world classification performance.
