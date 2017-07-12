import numpy as np
import json
from collections import OrderedDict

__all__ = [
    'table_to_list_of_dict'
]

def table_to_list_of_dict(table) :
    """Convert table to list of dict."""
    rows = []
    for row in table:
        data = OrderedDict()
        for name in table.colnames:
            val = row[name]
            # TODO: The below is not working, find a fix
            # if val in {np.nan}:
            #     val = None
            if isinstance(val, np.int64):
                val = int(val)
            elif isinstance(val, np.int32):
                val = int(val)
            elif isinstance(val, np.bool_):
                val = bool(val)
            elif isinstance(val, np.float):
                val = float(val)
            elif isinstance(val, np.float32):
                val = float(val)
            elif isinstance(val, np.str):
                val = str(val)
            elif isinstance(val, np.ndarray):
                vals = [float(_) for _ in val]
                val = list(vals)
            else:
                raise ValueError('Unknown type: {} {}'.format(val, type(val)))
            data[name] = val

        rows.append(data)

    return rows


def dump_to_json(cat, filename):
    with open(filename, 'w') as fh:
        data = cat._data_python_list
        for row in data:
            for key, value in row.items():
                if value == np.nan:
                    row[key] = None
                elif value == np.inf:
                    row[key] = None
        json.dump(data, fh)

    # Old way:
    # with open(filename, 'w') as fh:
        # data = json.dumps(cat._data_python_list)
        # mask = data.replace('NaN', 'null')
        # json.dump(json.loads(mask), fh)

