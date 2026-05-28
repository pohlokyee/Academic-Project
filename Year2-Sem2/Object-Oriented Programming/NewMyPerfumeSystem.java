// Import required packages
import java.io.*;
import java.util.*;

// Perfume class 
class Perfume {
    //Encapsulation
    private String name;
    private double price;
    private int quantitySold;
    private double totalSales;
    private int stockQuantity;

    // Constructor to create new Perfume object
    public Perfume(String name, double price,int stockQuantity) {
        this.name = name;
        this.price = price;
        this.quantitySold = 0;
        this.totalSales = 0.0;
        this.stockQuantity = stockQuantity;
    }

    // Getters for perfume attributes
    public String getName() { return name; }
    public double getPrice() { return price; }
    public int getQuantitySold() { return quantitySold; }
    public double getTotalSales() { return totalSales; }
    public int getStockQuantity() { return stockQuantity; }

    // Methods to manage sales and stock
    public void addSales(int quantity) {
        if (quantity > stockQuantity) {
            throw new IllegalArgumentException("Not enough stock for " + name);
        }
        this.quantitySold += quantity;
        this.totalSales += price * quantity;
        this.stockQuantity -= quantity;
        if (this.stockQuantity < 0) this.stockQuantity = 0;
    }

    // Method to add stock to the perfume
    public void addStock(int quantity) {
        if (quantity < 0) throw new IllegalArgumentException("Cannot add negative stock.");
        this.stockQuantity += quantity;
    }

    // Method to remove stock from the perfume
    public void removeStock(int quantity) {
        if (quantity < 0 || quantity > stockQuantity)
            throw new IllegalArgumentException("Invalid stock removal.");
        this.stockQuantity -= quantity;
        if (this.stockQuantity < 0) this.stockQuantity = 0;
    }

    // Method to set new stock quantity for the perfume
    public void setNewStockQuantity(int stockQuantity) {
        if (stockQuantity < 0)
            throw new IllegalArgumentException("Stock quantity cannot be negative.");
        this.stockQuantity = stockQuantity;
    }

    // Method to set new price for the perfume
    public void setNewPrice(double newPrice) {
        if (newPrice < 0)
            throw new IllegalArgumentException("Price cannot be negative.");
        this.price = newPrice;
    }
}

// Customer class
class Customer {
    private String name;
    private String contact;

    // Constructor to create new Customer object
    public Customer(String name, String contact) {
        this.name = name;
        this.contact = contact;
    }

    // Getters for customer attributes
    public String getName() { return name; }
    public String getContact() { return contact; }
}

// Bill interface
interface Bill {
    double calculateTotal();
    void generateBill(String filename);
}

// Order class implementing Bill interface
abstract class Order implements Bill {
    protected Customer customer; //accosiation
    protected ArrayList<Perfume> perfumes;  // aggregation
    protected ArrayList<Integer> quantities; 

    // Constructor to create new Order object
    public Order(Customer customer) {
        this.customer = customer;
        this.perfumes = new ArrayList<>();
        this.quantities = new ArrayList<>();
    }

    // Method to add perfume to the order
    public void addPerfume(Perfume perfume, int quantity) {
        perfumes.add(perfume);
        quantities.add(quantity);
        NewMyPerfumeSystem.totalSales += perfume.getPrice() * quantity;
        NewMyPerfumeSystem.totalPerfumeSold += quantity;
        perfume.addSales(quantity);
    }

    // Method to calculate total price of the order
    public double calculateTotal() {
        double total = 0;
        for (int i = 0; i < perfumes.size(); i++) {
            total += perfumes.get(i).getPrice() * quantities.get(i);
        }
        return total;
    }

    // Method to generate bill for the order
    public void generateBill(String filename) {
        try (PrintWriter pw = new PrintWriter(new FileWriter(filename))) {
            StringBuilder billContent = new StringBuilder();
            billContent.append("=== Bill for ").append(customer.getName())
                       .append(" (").append(getOrderType()).append(" Order) ===\n");
            billContent.append("Contact: ").append(customer.getContact()).append("\n");
            if (this instanceof OnlineOrder) {
                billContent.append("Delivery Address: ").append(((OnlineOrder) this).getDeliveryAddress()).append("\n");
            } else if (this instanceof InStoreOrder) {
                billContent.append("Store Address: ").append(((InStoreOrder) this).getStoreAddress()).append("\n");
            }
            billContent.append("\n");

            ArrayList<String> printed = new ArrayList<>();
            double grandTotal = 0;
            for (int i = 0; i < perfumes.size(); i++) {
                Perfume p = perfumes.get(i);
                int qty = 0;
                for (int j = 0; j < perfumes.size(); j++) {
                    if (perfumes.get(j).getName().equals(p.getName()) && !printed.contains(p.getName())) {
                        qty += quantities.get(j);
                    }
                }
                if (!printed.contains(p.getName())) {
                    double subtotal = p.getPrice() * qty;
                    billContent.append(String.format("%-20s x%-3d @ RM%.2f = RM%.2f\n",
                            p.getName(), qty, p.getPrice(), subtotal));
                    printed.add(p.getName());
                    grandTotal += subtotal;
                }
            }

            billContent.append(String.format("\nTotal: RM%.2f\n", grandTotal));
            pw.print(billContent.toString());
            System.out.println("\n" + billContent.toString());

        } catch (IOException e) {
            System.out.println("Failed to write bill.");
        }
    }

    public abstract String getOrderType();
}

// OnlineOrder and InStoreOrder classes extending Order class
class OnlineOrder extends Order {
    private String deliveryAddress;

    // Constructor to create new OnlineOrder object
    public OnlineOrder(Customer customer, String deliveryAddress) {
        super(customer); // call the parent constructor which is Order
        this.deliveryAddress = deliveryAddress;
    }

    // Getters for OnlineOrder attributes
    public String getOrderType() { return "Online"; }
    public String getDeliveryAddress() { return deliveryAddress; }
}

// InStoreOrder class extending Order class
class InStoreOrder extends Order {
    private String storeAddress;

    // Constructor to create new InStoreOrder object
    public InStoreOrder(Customer customer, String storeAddress) {
        super(customer);
        this.storeAddress = storeAddress;
    }

    // Getters for InStoreOrder attributes
    public String getOrderType() { return "InStore"; }
    public String getStoreAddress() { return storeAddress; }
}

// Main class for the MyPerfume System
public class NewMyPerfumeSystem {
    static ArrayList<Perfume> inventory = new ArrayList<>();
    static double totalSales = 0;
    static int totalPerfumeSold = 0;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("\nWelcome to MyPerfume Ordering and Billing System");
        inventory.add(new Perfume("Rose Essence", 50.0, 20));
        inventory.add(new Perfume("Lavender Bliss", 60.0, 15));

        while (true) {
            System.out.println("\n===== Login Menu =====");
            System.out.println("1. Customer Login");
            System.out.println("2. Admin Login");
            System.out.println("3. Exit");
            System.out.print("Choose option: ");

            try {
                int loginChoice = sc.nextInt();
                sc.nextLine();

                // Handle login choices
                if (loginChoice == 1) {
                    System.out.print("Enter username: ");
                    String username = sc.nextLine();
                    System.out.print("Enter password: ");
                    String password = sc.nextLine();

                    // Check customer credentials
                    if (username.equals("cust123") && password.equals("1234")) {
                        customerMenu(sc);
                    } else {
                        System.out.println("Invalid customer credentials!");
                    }
                } else if (loginChoice == 2) {
                    System.out.print("Enter username: ");
                    String username = sc.nextLine();
                    System.out.print("Enter password: ");
                    String password = sc.nextLine();

                    // Check admin credentials
                    if (username.equals("admin123") && password.equals("1234")) {
                        adminMenu(sc);
                    } else {
                        System.out.println("Invalid admin credentials!");
                    }
                } else if (loginChoice == 3) {
                    System.out.println("Exiting system...");
                    break;
                } else {
                    System.out.println("Invalid choice.");
                }
            } catch (InputMismatchException e) {
                System.out.println("Invalid input. Please enter a number.");
                sc.nextLine(); // Clear the invalid input
            }
        }
    }

    // Method to display customer menu and handle customer actions
    public static void customerMenu(Scanner sc) {
        while (true) {
            System.out.println("\n===== Customer Menu =====");
            System.out.println("1. Make new order");
            System.out.println("2. Logout");
            System.out.print("Enter choice: ");
            
            try{
                int choice = sc.nextInt();
                sc.nextLine();

                if (choice == 1) {
                    makeOrder(sc);
                } else if (choice == 2) {
                    System.out.println("Logging out...");
                    return;
                } else {
                    System.out.println("Invalid choice.");
                }
            } catch (InputMismatchException e) {
                System.out.println("Invalid input. Please enter a number.");
                sc.nextLine(); // Clear the invalid input
            }
        }
    }

    // Method to display admin menu and handle admin actions
    public static void adminMenu(Scanner sc) {
        while (true) {
            System.out.println("\n===== Admin Menu =====");
            System.out.println("1. View total sales");
            System.out.println("2. View inventory");
            System.out.println("3. Logout");
            System.out.print("Enter choice: ");
            
            try{
                int choice = sc.nextInt();
                sc.nextLine();

                if (choice == 1) {
                    viewSales();
                } else if (choice == 2) {
                    viewInventory();
                } else if (choice == 3) {
                    System.out.println("Logging out...");
                    return;
                } else {
                    System.out.println("Invalid choice.");
                }
            } catch (InputMismatchException e) {
                System.out.println("Invalid input. Please enter a number.");
                sc.nextLine(); // Clear the invalid input
            }
        }
    }

    // Method to make order
    public static void makeOrder(Scanner sc) {
        System.out.print("Enter customer name: ");
        String name = sc.nextLine();
        System.out.print("Enter customer contact: ");
        String contact = sc.nextLine();
        Customer customer = new Customer(name, contact); // Create new Customer object

        String type;
        while (true) {
            System.out.print("Is this order Online or InStore? (O/I): ");
            type = sc.nextLine().trim().toUpperCase();
            if (type.equals("O") || type.equals("I")) {
                break;
            } else {
                System.out.println("Invalid input. Please enter 'O' for Online or 'I' for InStore.");
            }
        }

        Order order;
        if (type.equals("O")) {
            System.out.print("Enter delivery address: ");
            String addr = sc.nextLine();
            order = new OnlineOrder(customer, addr); // Create new OnlineOrder object
        } 
        else {
            order = new InStoreOrder(customer, "123, Taman University"); // Create new InStoreOrder object with default store address
        }

        while (true) {
            // Display available perfumes and prompt for order
            System.out.println("\nAvailable Perfumes:");
            for (int i = 0; i < inventory.size(); i++) {
                Perfume p = inventory.get(i);
                System.out.printf("%d. %s (RM%.2f) - Stock: %d\n", i + 1, p.getName(), p.getPrice(), p.getStockQuantity());
                if (p.getStockQuantity() <= 0) {
                    System.out.println("   * Out of stock *");
                }
            }
            System.out.print("Enter perfume number to order (Enter -1 to end order): ");
            if (!sc.hasNextInt()) {
                System.out.println("Invalid input.");
                sc.nextLine();
                continue;
            }

            int num = sc.nextInt();
            if (num == -1) break;

            if (num < 1 || num > inventory.size()) {
                System.out.println("Invalid perfume number.");
                continue;
            }

            Perfume p = inventory.get(num - 1);
            int qty = 0;
            while (true) {
                System.out.print("Enter quantity: ");
                if (!sc.hasNextInt()) {
                    System.out.println("Invalid input. Please enter a positive integer.");
                    sc.nextLine();
                    continue;
                }
                qty = sc.nextInt();
                if (qty <= 0) {
                    System.out.println("Quantity must more than 0.");
                    continue;
                }
                if (qty > p.getStockQuantity()) {
                    System.out.println("Not enough stock. Available: " + p.getStockQuantity());
                    continue;
                }
                break;
            }
            order.addPerfume(p, qty);
        }
        sc.nextLine(); // consume leftover newline

        String filename = customer.getName().replaceAll("\\s+", "") + "_bill.txt"; // Generate filename based on customer name
        order.generateBill(filename); // Generate bill for the order
        System.out.println("Bill generated: " + filename);
    }

    // Method to add new perfume
    public static void addPerfume(Scanner sc) {
        System.out.print("Enter perfume name: ");
        String name = sc.nextLine();

        double price = 0;
        while (true) {
            System.out.print("Enter perfume price: ");
            try {
                price = sc.nextDouble();
                sc.nextLine();
                if (price < 0) {
                    throw new IllegalArgumentException("Price cannot be negative.");
                }
                if (price == 0) {
                    throw new IllegalArgumentException("Price cannot be zero.");
                }
                break;
            } catch (InputMismatchException e) {
                System.out.println("Invalid input. Please enter a valid number.");
                sc.nextLine();
            } catch (IllegalArgumentException e) {
                System.out.println(e.getMessage());
            }
        }

        int stock = 0;
        while (true) {
            System.out.print("Enter stock quantity: ");
            try {
                stock = sc.nextInt();
                sc.nextLine();
                if (stock < 0) {
                    throw new IllegalArgumentException("Stock cannot be negative.");
                }
                break;
            } catch (InputMismatchException e) {
                System.out.println("Invalid input. Please enter a valid integer.");
                sc.nextLine();
            } catch (IllegalArgumentException e) {
                System.out.println(e.getMessage());
            }
        }

        inventory.add(new Perfume(name, price, stock));
        System.out.println("Perfume added.");
    }

    // Method to view total sales and perfumes sold
    public static void viewSales() {
        System.out.println("Total sales: RM" + totalSales);
        System.out.println("Total perfumes sold: " + totalPerfumeSold);
        for (Perfume p : inventory) {
            if (p.getQuantitySold() > 0) {
                System.out.printf("%s - Units Sold: %d, Total Sales: RM%.2f\n", p.getName(), p.getQuantitySold(), p.getTotalSales()); // Display sales details for each perfume
            }
        }
    }

    // Method to view and manage inventory
    public static void viewInventory() {
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("\n=== Perfume Inventory ===");
            System.out.printf("%-4s %-20s %-10s %-15s %-10s\n", "No.", "Name", "Price", "Quantity Sold", "Stock Left");
            for (int i = 0; i < inventory.size(); i++) {
                Perfume p = inventory.get(i);
                System.out.printf("%-4d %-20s RM%-9.2f %-15d %-10d\n", i + 1, p.getName(), p.getPrice(), p.getQuantitySold(), p.getStockQuantity()); // Display inventory details
            }
            // Display inventory management options
            System.out.println("\nInventory Management Options:");
            System.out.println("1. Manage existing perfume");
            System.out.println("2. Add new perfume");
            System.out.println("3. Back to main menu\n");
            System.out.print("Choose option: ");
            
            int opt;
            try {
                opt = sc.nextInt();
                sc.nextLine();
            } catch (InputMismatchException e) {
                System.out.println("Invalid input! Please enter a number.");
                sc.nextLine(); // Clear buffer
                continue;
            }

            if (opt == 1) {
                System.out.print("Enter perfume number: ");
                
                int num;
                try {
                    num = sc.nextInt();
                    sc.nextLine();
                } catch (InputMismatchException e) {
                    System.out.println("Invalid input! Please enter a valid number.");
                    sc.nextLine();
                    continue;
                }
                
                if (num >= 1 && num <= inventory.size()) {
                    Perfume selected = inventory.get(num - 1); // Get selected perfume
                    // Display options for managing the selected perfume
                    System.out.println("1. Add stock");
                    System.out.println("2. Remove stock");
                    System.out.println("3. Set new stock quantity");
                    System.out.println("4. Update price\n");
                    System.out.print("Choose action: ");
                    
                    int action;
                    try {
                        action = sc.nextInt();
                        sc.nextLine();
                    } catch (InputMismatchException e) {
                        System.out.println("Invalid input! Please enter a valid number.");
                        sc.nextLine();
                        continue;
                    }

                    switch (action) { // Handle selected action
                        case 1:
                            System.out.print("Enter quantity to add: ");
                            int addQty = sc.nextInt();
                            sc.nextLine();
                            try {
                                selected.addStock(addQty); // Add stock to the selected perfume
                                System.out.println("Stock updated. New stock: " + selected.getStockQuantity());
                            } catch (InputMismatchException e) {
                                System.out.println("Invalid input! Please enter the correct type.");
                                sc.nextLine(); // clear buffer
                            } catch (IllegalArgumentException e) {
                                System.out.println("  " + e.getMessage()); // Handle exceptions for invalid stock addition
                            }
                            break;
                        case 2:
                            System.out.print("Enter quantity to remove: ");
                            int removeQty = sc.nextInt();
                            sc.nextLine();
                            try {
                                selected.removeStock(removeQty); // Remove stock from the selected perfume
                                System.out.println("Stock updated. New stock: " + selected.getStockQuantity());
                            } catch (InputMismatchException e) {
                                System.out.println("Invalid input! Please enter the correct type.");
                                sc.nextLine(); // clear buffer
                            } catch (IllegalArgumentException e) {
                                System.out.println("  " + e.getMessage()); // Handle exceptions for invalid stock removal
                            }
                            break;
                        case 3:
                            System.out.print("Enter new stock quantity: ");
                            int newQty = sc.nextInt();
                            sc.nextLine();
                            try {
                                selected.setNewStockQuantity(newQty); // Set new stock quantity for the selected perfume
                                System.out.println("Stock updated. New stock: " + selected.getStockQuantity());
                            } catch (InputMismatchException e) {
                                System.out.println("Invalid input! Please enter the correct type.");
                                sc.nextLine(); // clear buffer
                            } catch (IllegalArgumentException e) {
                                System.out.println("  " + e.getMessage()); // Handle exceptions for invalid stock quantity setting
                            }
                            break;
                        case 4:
                            System.out.print("Enter new price: RM");
                            double newPrice = sc.nextDouble();
                            sc.nextLine();
                            try {
                                selected.setNewPrice(newPrice); // Update price of the selected perfume
                                System.out.println("Price updated. New price: RM" + selected.getPrice());
                            } catch (InputMismatchException e) {
                                System.out.println("Invalid input! Please enter the correct type.");
                                sc.nextLine(); // clear buffer
                            } catch (IllegalArgumentException e) {
                                System.out.println("  " + e.getMessage()); // Handle exceptions for invalid price setting
                            }
                            break;
                        default:
                            System.out.println("Invalid action.");
                    }
                } 
                else {
                    System.out.println("Invalid perfume number.");
                }
            } 
            else if (opt == 2) {
                addPerfume(sc); // Call the addPerfume function
            } 
            else if (opt == 3) {
                break; // Back to main menu
            } 
            else {
                System.out.println("Invalid option.");
            }
        }
    }
}