/**
 * Created by Ivan Basenko on 12.12.2018.
 */

public with sharing class DeserializeDistanceMatrix {
    public List<String> destination_addresses;
    public List<String> origin_addresses;
    public List<Rows> rows;
    public String status;

    public class Elements {
        public Distance distance;
        public Distance duration;
        public Distance duration_in_traffic;
        public String status;
    }

    public class Distance {
        public String text;
        public Integer value;
    }

    public class Rows {
        public List<Elements> elements;
    }


    public static DeserializeDistanceMatrix parse(String json) {
        return (DeserializeDistanceMatrix) System.JSON.deserialize(json, DeserializeDistanceMatrix.class);
    }
}