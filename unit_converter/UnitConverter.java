import java.util.*;

public class UnitConverter {
    // Maps for linear conversions via a base unit
    private final Map<String, Double> lengthToMeter = new HashMap<>();
    private final Map<String, Double> weightToKg = new HashMap<>();
    private final Map<String, Double> volumeToLiter = new HashMap<>();
    private final Map<String, Double> timeToSecond = new HashMap<>();

    public UnitConverter() {
        // Length (base: meter)
        lengthToMeter.put("m", 1.0);
        lengthToMeter.put("km", 1000.0);
        lengthToMeter.put("cm", 0.01);
        lengthToMeter.put("mm", 0.001);
        lengthToMeter.put("mi", 1609.344);
        lengthToMeter.put("yd", 0.9144);
        lengthToMeter.put("ft", 0.3048);
        lengthToMeter.put("in", 0.0254);

        // Weight (base: kilogram)
        weightToKg.put("kg", 1.0);
        weightToKg.put("g", 0.001);
        weightToKg.put("mg", 0.000001);
        weightToKg.put("lb", 0.45359237);
        weightToKg.put("oz", 0.028349523125);

        // Volume (base: liter)
        volumeToLiter.put("l", 1.0);
        volumeToLiter.put("ml", 0.001);
        volumeToLiter.put("m3", 1000.0);        // 1 m^3 = 1000 L
        volumeToLiter.put("ft3", 28.316846592); // 1 ft^3 ≈ 28.316846592 L
        volumeToLiter.put("galUS", 3.785411784);// 1 US gallon ≈ 3.785411784 L

        // Time (base: second)
        timeToSecond.put("s", 1.0);
        timeToSecond.put("min", 60.0);
        timeToSecond.put("hr", 3600.0);
        timeToSecond.put("day", 86400.0);
    }

    public List<String> getUnitsByType(int type) {
        switch (type) {
            case 1: return new ArrayList<>(lengthToMeter.keySet());
            case 2: return new ArrayList<>(weightToKg.keySet());
            case 3: return Arrays.asList("C", "F", "K");
            case 4: return new ArrayList<>(volumeToLiter.keySet());
            case 5: return new ArrayList<>(timeToSecond.keySet());
            default: return Collections.emptyList();
        }
    }

    public double convert(int type, String from, String to, double value) {
        switch (type) {
            case 1: return linearConvert(lengthToMeter, from, to, value); // length
            case 2: return linearConvert(weightToKg, from, to, value);    // weight
            case 3: return tempConvert(from, to, value);                  // temperature
            case 4: return linearConvert(volumeToLiter, from, to, value); // volume
            case 5: return linearConvert(timeToSecond, from, to, value);  // time
            default: throw new IllegalArgumentException("Unknown type.");
        }
    }

    private double linearConvert(Map<String, Double> toBase, String from, String to, double value) {
        Double fromFactor = toBase.get(from);
        Double toFactor = toBase.get(to);
        if (fromFactor == null || toFactor == null) {
            throw new IllegalArgumentException("Unsupported unit for this category.");
        }
        double inBase = value * fromFactor;     // to base
        return inBase / toFactor;               // to target
    }

    // Temperature conversions are non-linear
    private double tempConvert(String from, String to, double v) {
        String f = from.toUpperCase(Locale.ROOT);
        String t = to.toUpperCase(Locale.ROOT);
        double k; // convert to Kelvin as base

        switch (f) {
            case "C": k = v + 273.15; break;
            case "F": k = (v - 32) * 5.0/9.0 + 273.15; break;
            case "K": k = v; break;
            default: throw new IllegalArgumentException("Unsupported temp unit.");
        }

        switch (t) {
            case "C": return k - 273.15;
            case "F": return (k - 273.15) * 9.0/5.0 + 32;
            case "K": return k;
            default: throw new IllegalArgumentException("Unsupported temp unit.");
        }
    }
}
