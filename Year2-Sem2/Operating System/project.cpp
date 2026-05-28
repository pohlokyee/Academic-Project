#include <iostream>
#include <vector>
#include <iomanip>
#include <algorithm>
using namespace std;

// Structure to store patient information
struct Patient {
    string id;
    int arrival, burst, priority, start = 0, finish = 0, waiting = 0, turnaround = 0;
    bool done = false;
};

// Reset all timing values for reusing same data
void reset(vector<Patient> &patients) {
    for (auto &p : patients) {
        p.start = p.finish = p.waiting = p.turnaround = 0;
        p.done = false;
    }
}

// Run SJF Scheduling
void runSJF(vector<Patient> patients) {
    cout << "\n=== Shortest Job First (SJF) Scheduling ===\n";
    int time = 0;
    int completed = 0;
    int total = patients.size();

    while (completed < total) {
        int idx = -1;
        int shortest = 9999;

        // Find shortest burst time among arrived patients
        for (int i = 0; i < total; i++) {
            if (!patients[i].done && patients[i].arrival <= time && patients[i].burst < shortest) {
                shortest = patients[i].burst;
                idx = i;
            }
        }

        if (idx == -1) {
            time++; // If no one has arrived, advance time
            continue;
        }

        // Process selected patient
        patients[idx].start = time;
        patients[idx].finish = time + patients[idx].burst;
        patients[idx].waiting = patients[idx].start - patients[idx].arrival;
        patients[idx].turnaround = patients[idx].finish - patients[idx].arrival;
        patients[idx].done = true;

        time = patients[idx].finish;
        completed++;
    }

    // Output
    float totalWait = 0, totalTurn = 0;
    cout << "ID\tArrival\tBurst\tStart\tFinish\tWaiting\tTurnaround\n";
    for (auto p : patients) {
        cout << p.id << "\t" << p.arrival << "\t" << p.burst << "\t" << p.start << "\t"
             << p.finish << "\t" << p.waiting << "\t" << p.turnaround << "\n";
        totalWait += p.waiting;
        totalTurn += p.turnaround;
    }
    cout << fixed << setprecision(2);
    cout << "Average Waiting Time: " << totalWait / total << endl;
    cout << "Average Turnaround Time: " << totalTurn / total << endl;
}

// Run Priority Scheduling
void runPriority(vector<Patient> patients) {
    cout << "\n=== Priority Scheduling ===\n";
    int time = 0;
    int completed = 0;
    int total = patients.size();

    while (completed < total) {
        int idx = -1;
        int bestPriority = 9999;

        // Find highest priority (lowest number) among arrived patients
        for (int i = 0; i < total; i++) {
            if (!patients[i].done && patients[i].arrival <= time) {
                if (patients[i].priority < bestPriority) {
                    bestPriority = patients[i].priority;
                    idx = i;
                } else if (patients[i].priority == bestPriority) {
                    // If same priority, pick the earlier arrival
                    if (patients[i].arrival < patients[idx].arrival)
                        idx = i;
                }
            }
        }

        if (idx == -1) {
            time++;
            continue;
        }

        // Process selected patient
        patients[idx].start = time;
        patients[idx].finish = time + patients[idx].burst;
        patients[idx].waiting = patients[idx].start - patients[idx].arrival;
        patients[idx].turnaround = patients[idx].finish - patients[idx].arrival;
        patients[idx].done = true;

        time = patients[idx].finish;
        completed++;
    }

    // Output
    float totalWait = 0, totalTurn = 0;
    cout << "ID\tArrival\tBurst\tPriority\tStart\tFinish\tWaiting\tTurnaround\n";
    for (auto p : patients) {
        cout << p.id << "\t" << p.arrival << "\t" << p.burst << "\t" << p.priority << "\t\t"
             << p.start << "\t" << p.finish << "\t" << p.waiting << "\t" << p.turnaround << "\n";
        totalWait += p.waiting;
        totalTurn += p.turnaround;
    }
    cout << fixed << setprecision(2);
    cout << "Average Waiting Time: " << totalWait / total << endl;
    cout << "Average Turnaround Time: " << totalTurn / total << endl;
}

int main() {
    // Patient list (id, arrival time, burst time, priority)
    vector<Patient> patients = {
        {"P1", 0, 5, 3},
        {"P2", 1, 8, 1},
        {"P3", 2, 6, 2},
        {"P4", 3, 7, 4}
    };

    // Run SJF
    runSJF(patients);

    // Reset and run Priority
    reset(patients);
    runPriority(patients);

    return 0;
}
