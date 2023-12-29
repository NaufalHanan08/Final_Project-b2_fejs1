import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";

const VideoPlayer = ({ videoLink }) => {
  const [materialData, setMaterialData] = useState(null);

  const apiUrl = videoLink;

  const fetchData = useCallback(async () => {
    try {
      const accessToken = Cookies.get("accessToken");

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMaterialData(response.data.results);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {materialData ? (
        <>
          <div className="w-full py-8 pl-10 lg:pr-0 pr-10">
            <iframe
              title={materialData.materialName}
              className="flex justtify-center rounded-2xl w-full sm:h-96 h-fit"
              src={`https://www.youtube.com/embed/${materialData.videoLink
                .split("/")
                .pop()}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

VideoPlayer.propTypes = {
  videoLink: PropTypes.string.isRequired,
};

export default VideoPlayer;
