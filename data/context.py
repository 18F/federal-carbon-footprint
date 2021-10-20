import contextlib
import os

CACHE_DIR = os.path.join(os.path.dirname(__file__), ".cache")


class Context:
    @contextlib.contextmanager
    def extract_file(self, extract_file_name: str):
        os.makedirs(CACHE_DIR, exist_ok=True)
        file = open(os.path.join(CACHE_DIR, extract_file_name), "w")
        yield file
        file.close()
