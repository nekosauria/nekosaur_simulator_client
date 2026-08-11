// mock/uploadMock.js
export const mockUploadData = {
    "success": true,
    "detector": {
        "origin": {
            "image": "http://127.0.0.1:5001/static/images/user_upload/origin/5185d8159e1c29d205a103091a30b5a7_16_cat.jpeg",
            "detect_image": "http://127.0.0.1:5001/static/images/user_upload/detect/maskrcnn_model/4c4ff92631ce9ebee2e30d5f65c7cb3a_glass_cat.jpg",
            "detect_model": "maskrcnn_model",
            "has_neko": false,
            "is_cache": false,
            "score_list": {
                "cat": 0.992,
                "teddy bear": 0.613,
                "tie": 0.181,
                "person": 0.059,
                "bird": 0.051
            },
            "score_results": {
                "cat": 0.992,
                "teddy bear": 0.613
            },
            "create_time": "2026-08-08 19:35:29"
        },
        "similar": {
            "image": "http://127.0.0.1:5001/static/images/user_upload/origin/5185d8159e1c29d205a103091a30b5a7_16_cat.jpeg",
            "detect_image": "http://127.0.0.1:5001/static/images/user_upload/detect/yolo11n/15cbb5b4df706608ed1af7ffdbe062ee_cat0.jpg",
            "detect_model": "yolo11n",
            "has_neko": true,
            "is_cache": true,
            "score_list": {
                "cat": 0.992,
                "teddy bear": 0.613,
                "tie": 0.181,
                "person": 0.059,
                "bird": 0.051
            },
            "score_results": {
                "cat": 0.992,
                "teddy bear": 0.613
            },
            "create_time": "2026-08-08 19:35:29"
        }
    },
    "transform": {
        "origin": {
            "transform_image": "http://127.0.0.1:5001/static/images/user_upload/transform/stable-diffusion-v1-5/4b8155b00a14e0b57daa61e7b1a8afb1_cat0.jpg",
            "transform_model": "sd-image-variations-diffusers",
            "is_cache": false,
            "create_time": "2026-08-08 19:35:51"
        },
        "similar": {
            "transform_image": "http://127.0.0.1:5001/static/images/user_upload/transform/sd-image-variations-diffusers/0cc1d7287171f3ff2145fd0375997baa_16_cat.jpg",
            "transform_model": "sd-image-variations-diffusers",
            "is_cache": true,
            "create_time": "2026-08-08 19:35:51"
        }
    },
    "metrics": {
        "image_process_count": 21,
        "image_validate_cost": 0.015,
        "image_embedding_cost": 0.088,
        "origin_detector_cost": 1.246,
        "similar_detector_cost": 4.44,
        "origin_transform_cost": 22.132,
        "similar_transform_cost": 11.123,
        "api_cost": 23.398
    }
}