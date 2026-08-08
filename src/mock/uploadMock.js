// mock/uploadMock.js
export const mockUploadData = {
    "detector": {
        "origin": {
            "image": "http://127.0.0.1:5001/static/images/user_upload/origin/5185d8159e1c29d205a103091a30b5a7_16_cat.jpeg",
            "detect_image": "http://127.0.0.1:5001/static/images/user_upload/detect/torch/3f022999b6bbe2dd51275a3caa80e3b3_16_cat.jpg",
            "detect_model": "torch",
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
            "create_time": "2026-08-08 19:35:29",
            "cost": 1.246
        },
        "similar": {
            "image": "http://127.0.0.1:5001/static/images/user_upload/origin/5185d8159e1c29d205a103091a30b5a7_16_cat.jpeg",
            "detect_image": "http://127.0.0.1:5001/static/images/user_upload/detect/torch/3f022999b6bbe2dd51275a3caa80e3b3_16_cat.jpg",
            "detect_model": "yolo",
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
            "create_time": "2026-08-08 19:35:29",
            "cost": 4.44
        }
    },
    "transform": {
        "origin": {
            "transform_image": "http://127.0.0.1:5001/static/images/user_upload/transform/cea4e5c93e4290dc38e394ca4ef43dce_16_cat.jpg",
            "transform_model": "sd_image_variations_transform",
            "is_cache": false,
            "create_time": "2026-08-08 19:35:51",
            "cost": 22.132
        },
        "similar": {
            "transform_image": "http://127.0.0.1:5001/static/images/user_upload/transform/cea4e5c93e4290dc38e394ca4ef43dce_16_cat.jpg",
            "transform_model": "sd_image_variations_transform",
            "is_cache": true,
            "create_time": "2026-08-08 19:35:51",
            "cost": 11.123
        }
    },
    "success": true,
    "metrics": {
        "image_process_count": 21,
        "api_cost": 23.398
    }
}