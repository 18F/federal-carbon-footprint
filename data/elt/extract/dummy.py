import json


def get_dummy_data(ctx):
    with ctx.extract_file("dummy.json") as extract:
        json.dump(
            (
                ("Diesel", 12.9, 109.6),
                ("Fuel Oil", 1.8, 15.7),
                ("Gasoline", 5.1, 43.3),
                ("Jet Fuel", 40.6, 345.0),
                ("Renewables", 1.3, 11.1),
                ("Electricity", 20.5, 173.8),
                ("Natural Gas", 15.1, 128.3),
                ("Other", 2.6, 22.3),
            ),
            extract,
        )
