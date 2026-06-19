// Assignment 1 - SECJ2013 - 23241 (Assg1.cpp)
// Group Members:
// 1. Chau Ying Jia A23CS0213
// 2. Lau Yee Wen A23CS0099
// 3. Poh Lok Yee A23CS0262

#include <iostream>
#include <string>
#include <fstream>
#include "Student.h"

using namespace std;

// function headers
void listStudent(Student* [], int);
void sortByName(Student* [], int);
void sortByGrade(Student* [], int);

// main function
int main() {
    const int LIST_SIZE = 10;
    string name;
    int cw, fe, idx = 0;
    Student* studList[LIST_SIZE];
    Student* oriList[LIST_SIZE];

    fstream fileIn("Marks.txt", ios::in);

    if (!fileIn) {
        cout << "File input/output error!\n";
        return 1;

    } else {
        while (fileIn >> name >> cw >> fe) {
            studList[idx] = new Student(name, cw, fe);
            oriList[idx] = new Student(name, cw, fe);//to store original list
            idx++;
        }
        
        int opt = 0;

        while (opt != 4) {
            cout << "\n1. List results (original list)";
            cout << "\n2. List results (sort by name)";
            cout << "\n3. List results (sort by grade)";
            cout << "\n4. Exit\n\n";
            
            cout << "Enter your choice [1, 2, 3, 4]: ";
            cin >> opt;
            
            if (opt == 1) {
                listStudent(oriList, idx); // to show original list , studlist will show sorted list
                
            }
            
            if (opt == 2){
            	sortByName(studList, idx);
            	listStudent(studList, idx);
			}
			
			if(opt == 3){
            	sortByGrade(studList, idx);
            	listStudent(studList, idx);
			}
            
            if (opt != 4) system("pause");
        }

        fileIn.close();
    }

    return 0;
}

// function implementation
void listStudent(Student* sl[], int size) {
    for (int i = 0; i < size; i++) {
        sl[i]->printResult();
    }
}

    
    void sortByName(Student* sl[],int size){

    	for(int pass=1;pass<size;++pass){

    		for(int x=0;x<size-pass;++x){
    			
    			if(sl[x]->getName() > sl[x+1]->getName()){
    				swap(sl[x],sl[x+1]); //build in function
				}
			}	
		}
	}
	
	void sortByGrade(Student* sl[],int size){
		
    	for(int pass=1;pass<size;++pass){
    		
    		for(int x=0;x<size-pass;++x){
    			
    			if(sl[x]->getGrade() > sl[x+1]->getGrade()){
    				swap(sl[x],sl[x+1]);	
    				
				}else if(sl[x]->getGrade() == sl[x+1]->getGrade()){ //if same grade
					
						if(sl[x]->getName() > sl[x+1]->getName()){ // swap to sort name with same grade
							swap(sl[x],sl[x+1]);
		    			}
		    	}	
			}	
		}
	}
