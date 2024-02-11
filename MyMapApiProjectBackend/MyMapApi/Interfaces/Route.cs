using System;
namespace MyMapApi
{
    public class Route
    {
        // Route sınıfının özellikleri
        public int Id { get; set; }
        public double StartCoordinateX { get; set; }
        public double StartCoordinateY { get; set; }
        public double EndCoordinateX { get; set; }
        public double EndCoordinateY { get; set; }
    }
}

