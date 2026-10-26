#!/usr/bin/env python3
"""Verify public discovery files survived the Pages action's actual archive step."""
from pathlib import Path
import sys
import tarfile


def verify(archive_path, public_dir):
    public_dir = Path(public_dir)
    expected = {str(path.relative_to(public_dir)): path.read_bytes()
                for path in (public_dir / ".well-known").rglob("*") if path.is_file()}
    if not expected:
        raise ValueError("No discovery files were found in the source")
    expected[".nojekyll"] = b""
    with tarfile.open(archive_path, "r:*") as archive:
        entries = {}
        for member in archive.getmembers():
            name = member.name.removeprefix("./")
            if name in expected:
                if name in entries or not member.isfile():
                    raise ValueError("Invalid Pages artifact entry: " + name)
                entries[name] = archive.extractfile(member).read()
    for name, content in expected.items():
        if name not in entries:
            raise ValueError("Pages artifact is missing " + name + "; enable include-hidden-files")
        if entries[name] != content:
            raise ValueError("Pages artifact content differs from source: " + name)
    print("Pages artifact preserves all " + str(len(expected)) + " discovery files and markers")


if __name__ == "__main__":
    try:
        verify(sys.argv[1], Path(__file__).resolve().parents[1] / "docs/public")
    except (IndexError, OSError, ValueError, tarfile.TarError) as error:
        print(str(error), file=sys.stderr)
        raise SystemExit(1)
