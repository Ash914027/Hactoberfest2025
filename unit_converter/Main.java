import java.util.*;

public class Main {
    private static final Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        UnitConverter converter = new UnitConverter();
        while (true) {
            System.out.println("\n=== Unit Converter ===");
            System.out.println("1) Length   (m, km, cm, mm, mi, yd, ft, in)");
            System.out.println("2) Weight   (kg, g, mg, lb, oz)");
            System.out.println("3) Temp     (C, F, K)");
            System.out.println("4) Volume   (l, ml, m3, ft3, galUS)");
            System.out.println("5) Time     (s, min, hr, day)");
            System.out.println("6) Exit");
            System.out.print("Choose type: ");

            int type;
            try {
                type = Integer.parseInt(sc.nextLine().trim());
            } catch (Exception e) {
                System.out.println("Invalid choice.");
                continue;
            }
            if (type == 6) {
                System.out.println("Goodbye!");
                break;
            }

            // List units for the chosen category
            List<String> units = converter.getUnitsByType(type);
            if (units.isEmpty()) {
                System.out.println("Invalid type.");
                continue;
            }

            System.out.println("\nAvailable units: " + String.join(", ", units));
            System.out.print("From unit: ");
            String from = sc.nextLine().trim();

            System.out.print("To unit: ");
            String to = sc.nextLine().trim();

            if (!units.contains(from) || !units.contains(to)) {
                System.out.println("Invalid unit. Please pick from the list.");
                continue;
            }

            System.out.print("Value: ");
            double value;
            try {
                value = Double.parseDouble(sc.nextLine().trim());
            } catch (Exception e) {
                System.out.println("Invalid number.");
                continue;
            }

            try {
                double result = converter.convert(type, from, to, value);
                System.out.printf(Locale.US, "%.6f %s = %.6f %s%n", value, from, result, to);
            } catch (IllegalArgumentException e) {
                System.out.println("Conversion error: " + e.getMessage());
            }
        }
    }
}
