import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, X } from "lucide-react";
import { toast } from "react-toastify";
// import { useDb } from "@/components/ALL_DBWORK/DbContext";
import useAxiosSec from "@/components/Axios/useAxiosSec";

interface ProductFormData {
  name: string;
  price: string;
  Hprice : string,
  description: string;
  category: string;
  brand: string;
  stock: string;
  Stitch: string;
  Sticth_Pent : string,
  Un_Sticth_Pent : string,
  Orna : string,
  Inner: string,
  Extra: string;
  sizes: string[];
  colors: string[];
  material: string;
  gender: string;
  season: string;
  pic1: string | null;
  pic2: string | null;
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    Hprice: "",
    description: "",
    category: "",
    brand: "",
    stock: "",
    Extra: "",
    Stitch: "",
    Sticth_Pent: "",
    Un_Sticth_Pent: "",
    Orna : "",
    Inner : "",
    sizes: [],
    colors: [],
    material: "",
    gender: "",
    season: "",
    pic1: null,
    pic2: null,
  });

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [pic1, setPic1] = useState<File | null>(null);
  const [pic2, setPic2] = useState<File | null>(null);

  const categories = [
    "Top",
    "Trandy",
    "Regular",

  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#DC2626" },
    { name: "Blue", value: "#2563EB" },
    { name: "Green", value: "#16A34A" },
    { name: "Yellow", value: "#EAB308" },
    { name: "Purple", value: "#9333EA" },
    { name: "Pink", value: "#EC4899" },
    { name: "Gray", value: "#6B7280" },
    { name: "Brown", value: "#A16207" },
    { name: "Navy", value: "#1E3A8A" },
    { name: "Beige", value: "#D6D3D1" },
  ];

  const materials = [
    "Cotton",
    "Polyester",
    "Wool",
    "Silk",
    "Linen",
    "Denim",
    "Leather",
    "Cashmere",
    "Viscose",
    "Spandex",
    "Nylon",
    "Blend",
  ];

  const genders = ["Men", "Women", "Unisex", "Kids"];

  const seasons = ["Spring", "Summer", "Fall", "Winter", "All Season"];

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) => {
      const newSizes = prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size];
      setFormData((prevData) => ({ ...prevData, sizes: newSizes }));
      return newSizes;
    });
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) => {
      const newColors = prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color];
      setFormData((prevData) => ({ ...prevData, colors: newColors }));
      return newColors;
    });
  };

  const handlePic1Upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPic1(file);
    // Don't update formData.pic1 here
  };

  const handlePic2Upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPic2(file);
    // Don't update formData.pic2 here
  };

  const removePic1 = () => {
    setPic1(null);
    setFormData((prevData) => ({ ...prevData, pic1: null }));
  };

  const removePic2 = () => {
    setPic2(null);
    setFormData((prevData) => ({ ...prevData, pic2: null }));
  };

  const [l, setL] = useState<boolean>(false);
  const handleSubmit = async () => {
    try {
      setL(true);
      let uploadedPic1Url = null;
      let uploadedPic2Url = null;

      if (pic1) {
        const imageData1 = new FormData();
        imageData1.append("file", pic1); // ✅ the actual File object
        imageData1.append("upload_preset", "rosewood");

        const response1 = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_HOST
          }/image/upload`,
          imageData1
        );

        uploadedPic1Url = response1.data.secure_url;
      }

      if (pic2) {
        const imageData2 = new FormData();
        imageData2.append("file", pic2);
        imageData2.append("upload_preset", "rosewood");

        const response2 = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_HOST
          }/image/upload`,
          imageData2
        );

        uploadedPic2Url = response2.data.secure_url;
      }

      const dataAll = {
        ...formData,
        sizes: selectedSizes,
        colors: selectedColors,
        pic1: uploadedPic1Url,
        pic2: uploadedPic2Url,
      };
      mutationUp.mutate(dataAll);
      setL(false);
      // toast.success("Item Added !")
      // console.log(dataAll);

      setFormData({
        name: "",
        price: "",
        Hprice : "",
        description: "",
        category: "",
        brand: "",
        stock: "",
        Extra: "",
        Stitch: "",
        Sticth_Pent : "",
        Un_Sticth_Pent : "",
        Orna: "",
        Inner: "",
        sizes: [],
        colors: [],
        material: "",
        gender: "",
        season: "",
        pic1: null,
        pic2: null,
      });
      setSelectedSizes([]);
      setSelectedColors([]);
      setPic1(null);
      setPic2(null);
    } catch (error) {
      setL(false);
      console.error("Upload error:", error);
      toast.error("There was a problem submitting the product.");
    }
  };

  const axiosSec = useAxiosSec();

  const mutationUp = useMutation({
    mutationFn: async (Data : ProductFormData) => {
      const res = await axiosSec.post("/allData", Data);
      return res.data;
    },
    onSuccess: () => {
      toast("Item Added !");
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Add New Product
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                required
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                required
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Highest Price *</Label>
              <Input
                id="Hprice"
                required
                type="number"
                placeholder="0.00"
                value={formData.Hprice}
                onChange={(e) => handleInputChange("Hprice", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                required
                placeholder="Enter brand name"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                required
                placeholder="0"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="Stitch">Stitch</Label>
              <Input
                id="Stitch"
                type="number"
                placeholder="Stitch price...."
                value={formData?.Stitch}
                onChange={(e) => handleInputChange("Stitch", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Sticth_Pent">Sticth Pent Price</Label>
              <Input
                id="Sticth_Pent"
                type="number"
                placeholder="Stitch pent price...."
                value={formData?.Sticth_Pent}
                onChange={(e) => handleInputChange("Sticth_Pent", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Un_Sticth_Pent">Non Sticth Pent Price</Label>
              <Input
                id="Un_Sticth_Pent"
                type="number"
                placeholder="Non stitch pent price...."
                value={formData?.Un_Sticth_Pent}
                onChange={(e) => handleInputChange("Un_Sticth_Pent", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Orna">Orna Price</Label>
              <Input
                id="Orna"
                type="number"
                placeholder="Orna price here...."
                value={formData?.Orna}
                onChange={(e) => handleInputChange("Orna", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Orna">Inner Price</Label>
              <Input
                id="Inner"
                type="number"
                placeholder="Inner price here...."
                value={formData?.Inner}
                onChange={(e) => handleInputChange("Inner", e.target.value)}
              />
            </div>
            
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="material">Material</Label>
              <Select
                onValueChange={(value) => handleInputChange("material", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  {materials.map((material) => (
                    <SelectItem key={material} value={material}>
                      {material}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <Select
                onValueChange={(value) => handleInputChange("season", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season} value={season}>
                      {season}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <Label>Available Sizes</Label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedSizes.includes(size)
                      ? "border-primary text-white"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                  style={
                    selectedSizes.includes(size)
                      ? { backgroundColor: "#761A24" }
                      : {}
                  }
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSizes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedSizes.map((size) => (
                  <Badge key={size} variant="secondary">
                    {size}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <Label>Available Colors</Label>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => handleColorToggle(color.name)}
                  className={`relative w-12 h-12 rounded-lg border-2 transition-all ${
                    selectedColors.includes(color.name)
                      ? "border-primary scale-110"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {selectedColors.includes(color.name) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full border border-gray-300"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            {selectedColors.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedColors.map((color) => (
                  <Badge key={color} variant="secondary">
                    {color}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Individual Picture Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pic 1 */}
            <div className="space-y-3">
              <Label>Picture 1</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePic1Upload}
                  className="hidden"
                  id="pic1-upload"
                />
                <label htmlFor="pic1-upload" className="cursor-pointer">
                  {pic1 ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(pic1) || "/placeholder.svg"}
                        alt="Picture 1"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removePic1}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload Picture 1</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Pic 2 */}
            <div className="space-y-3">
              <Label>Picture 2</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePic2Upload}
                  className="hidden"
                  id="pic2-upload"
                />
                <label htmlFor="pic2-upload" className="cursor-pointer">
                  {pic2 ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(pic2) || "/placeholder.svg"}
                        alt="Picture 2"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removePic2}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload Picture 2</p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            {/* <Button variant="outline">Cancel</Button> */}
            {
              l? <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>: <Button
              onClick={handleSubmit}
              className="text-white"
              style={{ backgroundColor: "#761A24" }}
            >
             
                Add Product
             
            </Button>
            }
           
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
