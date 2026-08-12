// mock/uploadMock.js
export const mockUploadData = {
    "success": true,
    "origin": {
        "image": {
            "image_path": "http://127.0.0.1:5001/static/images/user_upload/origin/c6a06586912dc23d38c779261d7c9ca3_cat2.jpeg",
            "md5_hash": "c6a06586912dc23d38c779261d7c9ca3",
            "created_at": "2026-08-12 18:37:12"
        },
        "detector": {
            "detect_path": "http://127.0.0.1:5001/static/images/user_upload/detect/yolo11n/cf79d8511af62a3d0b23d3d02983476b_cat2.jpg",
            "md5_hash": "cf79d8511af62a3d0b23d3d02983476b",
            "detect_model": "yolo11n",
            "has_cat": true,
            "is_preprocessed": false,
            "predict_list": {
                "cat": 0.933
            },
            "tag_results": {
                "cat": 0.933
            },
            "created_at": "2026-08-12 18:37:13"
        },
        "transform": {
            "transform_path": "http://127.0.0.1:5001/static/images/user_upload/transform/stable-diffusion-v1-5/a89adb2dd009445404f0e370362c2c0a_cat2.jpg",
            "md5_hash": "a89adb2dd009445404f0e370362c2c0a",
            "transform_model": "stable-diffusion-v1-5",
            "is_preprocessed": true,
            "created_at": "2026-08-12 18:37:17"
        },
        "embedding": {
            "embedding_model": "clip-ViT-B-32",
            "vector_512": [],
            "created_at": "2026-08-12 18:37:12"
        }
    },
    "similar": {
        "image": {
            "image": "http://127.0.0.1:5001/static/images/user_upload/origin/099023a8ba6bd33089e103bbb21fb98c_16_cat.jpeg",
            "md5_hash": "099023a8ba6bd33089e103bbb21fb98c",
            "created_at": "2026-08-12 18:26:25",
            "distance": 0.26004021649470366,
            "distance_percent": 74.0
        },
        "detector": {
            "detect_path": "http://127.0.0.1:5001/static/images/user_upload/detect/yolo11n/5185d8159e1c29d205a103091a30b5a7_16_cat.jpg",
            "md5_hash": "5185d8159e1c29d205a103091a30b5a7",
            "detect_model": "yolo11n",
            "has_cat": false,
            "is_preprocessed": false,
            "predict_list": {
                "cat": 0.341
            },
            "tag_results": {},
            "created_at": "2026-08-12 18:26:27"
        },
        "transform": {
            "transform_path": "http://127.0.0.1:5001/static/images/thecatapi/transform/stable-diffusion-v1-5/f23fe74470ba2af4daf815235e9266ed_099023a8ba6bd33089e103bbb21fb98c_16_cat.jpg",
            "md5_hash": "f23fe74470ba2af4daf815235e9266ed",
            "transform_model": "stable-diffusion-v1-5",
            "is_preprocessed":true,
            "created_at": "2026-08-12 18:37:20"
        },
        "embedding": {
            "embedding_model": "clip-ViT-B-32",
            "vector_512": [],
            "created_at": null
        }
    },
    "metrics": {
        "image_process_count": 131,
        "image_validate_cost": 0.014,
        "image_embedding_cost": 0.131,
        "origin_detector_cost": 0.97,
        "similar_detector_cost": 0.002,
        "origin_transform_cost": 3.494,
        "similar_transform_cost": 3.271,
        "api_cost": 7.885
    }
}