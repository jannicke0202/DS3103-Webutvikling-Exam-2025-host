import { useState } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";


const EditAthlete = ({athlete, onSave, onCancel}: {
    athlete: IAthlete; 
    onSave: (updated: IAthlete) => void;
    onCancel: () => void;
}) => {

    const [name, setName] = useState(athlete.name);
    const [price, setPrice] = useState(athlete.price.toString());
    const [purchaseStatus, setPurchaseStatus] = useState<boolean>(athlete.purchaseStatus);

    const saveAthlete = () => {
        console.log("Save clicked", {name, price, purchaseStatus})
        const updatedAthlete: IAthlete = ({
            ...athlete,
            name: name.trim(),
            price: Number(price) || 0,
            purchaseStatus: purchaseStatus,
        });
        onSave(updatedAthlete);
    };



    return (
  <div className="bg-white rounded-lg p-6 border shadow-lg">
    <h3 className="text-2xl font-bold mb-6 text-center">Edit Athlete</h3>

    <div className="grid grid-cols-1 gap-6">
      
      <div>
        <label className="block mb-2 font-bold">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          autoFocus
        />
      </div>

      
      <div>
        <label className="block mb-2 font-bold">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      
      <div>
        <label className="block mb-2 font-bold">Purchase Status</label>
        <select
          value={purchaseStatus ? "bought" : "available"}
          onChange={(e) => setPurchaseStatus(e.target.value === "bought")}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="available">Available</option>
          <option value="bought">Bought</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mt-8">
      <button
        onClick={saveAthlete}
        className="bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700"
      >
        Save Changes
      </button>
      <button
        onClick={onCancel}
        className="bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700"
      >
        Cancel
      </button>
    </div>
  </div>
);
}   
export default EditAthlete;

