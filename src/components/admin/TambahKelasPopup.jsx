import PropTypes from "prop-types";
import { Button } from "@material-tailwind/react";
import Draggable from "react-draggable";

const TambahKelasPopup = ({
  isVisible,
  togglePopup,
  inputData,
  handleInputChange,
  handleTambah,
}) => {
  return (
    isVisible && (
      <Draggable handle=".popup-header">
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-75 bg-gray-700">
          <div className="bg-white p-8 rounded-md">
            <div className="popup-header cursor-move">
              <h2 className="text-xl font-semibold mb-4">Tambah Kelas Baru</h2>
            </div>
            <div className="mb-4 flex flex-col">
              <label>Kategori Kelas</label>
              <input
                type="text"
                name="category"
                className="border-2 border-gray-200"
                value={inputData.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label>Nama Kelas</label>
              <input
                type="text"
                name="courseName"
                className="border-2 border-gray-200"
                value={inputData.courseName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label>Tipe Kelas</label>
              <input
                type="text"
                name="courseType"
                className="border-2 border-gray-200"
                value={inputData.courseType}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label>Level Kelas</label>
              <input
                type="text"
                name="level"
                className="border-2 border-gray-200"
                value={inputData.level}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label>Harga Kelas</label>
              <input
                type="text"
                name="price"
                className="border-2 border-gray-200"
                value={inputData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end gap-1">
              <Button className="bg-blue-700 p-2" onClick={handleTambah}>
                Simpan
              </Button>
              <Button className="bg-red-700 p-2" onClick={togglePopup}>
                Batal
              </Button>
            </div>
          </div>
        </div>
      </Draggable>
    )
  );
};

TambahKelasPopup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  togglePopup: PropTypes.func.isRequired,
  inputData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleTambah: PropTypes.func.isRequired,
};

export default TambahKelasPopup;
