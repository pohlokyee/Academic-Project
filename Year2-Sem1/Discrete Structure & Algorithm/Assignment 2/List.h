#include <iostream>
#include <string>

using namespace std;

// List class definition
class List {
    private:
        Student *head, *last;
        
    public:
        List() { 
            cout << "Create list...\n";
            head = NULL; last = NULL;
        }
        
        void insertNode(Student *newStud) {
        	cout << "Insert " << newStud->getName() << "\n";
    		
    		if (head == NULL || head->getName() > newStud->getName()) {
	            newStud->setNext(head);
	            head = newStud;
	            if (last == NULL) last = newStud;
	            return;
    		}

			Student *prev = NULL;
			Student *current = head;
				
			while(current!=NULL && current->getName()<newStud->getName()){
				prev=current;
				current=current->getNext();
			}
				
			newStud->setNext(current);
			prev->setNext(newStud);
				
			if (current == NULL) {
	        	last = newStud;
	    	}
        }
        
        Student *findNode(string name) {
        	Student *current=head;
        	while(current!=NULL){
        		if(current->getName()==name){
        			return current;
				}
				current=current->getNext();
			}
            return NULL;
        }
        
        void deleteNode(string name) {
        	cout<<"Destroy student object - "<<name<<endl;
        	
        	if (head==NULL) {
        		cout<<"List is empty. Cannot delete."<<name<<endl;
    		}
        	
        	if(head->getName()==name){
        		Student *temp=head;
        		head=head->getNext();
        		if(head==NULL){
        			last=NULL;
				}
				else if(head->getNext()==NULL){
					last=head;
				}
        		return;
			}
			
            Student *stud, *prev;
			stud = head;
			prev=NULL;
			
			while(stud!=NULL && stud->getName()!=name){
				prev=stud;
				stud=stud->getNext();
			}
    
			prev->setNext(stud->getNext());
			if(stud==last){
				last=prev;
			}
			
        }
        
        void displayList() {
        	Student *stud = head;
        	
        	while (stud != NULL) {
        		stud->printResult();
        		stud = stud->getNext();
			}
        }
        
        Student *getHead() { return head; }
        Student *getLast() { return last; }
        
        ~List() {
        	Student *stud = head;
        	cout << "Destroy list...\n";
        	while (stud != NULL) {
        		Student *prevStud = stud;
        		stud = stud->getNext();
        		delete prevStud;
			}
		}
};
