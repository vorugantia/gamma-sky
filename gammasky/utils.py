import numpy as np
import json
import os  # TODO remove
from collections import OrderedDict

__all__ = [
    'table_to_list_of_dict'
]


def table_to_list_of_dict(table):
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


# def dump_list_to_json(cat, filename):
#     with open(filename, 'w') as fh:
#         data = cat._data_python_list
#         for row in data:
#             for key, value in row.items():
#                 try:
#                     if np.isnan(value):
#                         data[key] = None
#                     elif np.isinf(value):
#                         data[key] = None
#                 except:
#                     pass
#         json.dump(data, fh)
#
#
# def dump_dict_to_json(source, filename):
#     with open(filename, 'w') as fh:
#         data = source._data_python_dict
#         for key, value in data.items():
#             try:
#                 if np.isnan(value):
#                     data[key] = None
#                 elif np.isinf(value):
#                     data[key] = None
#             except:
#                 pass
#         json.dump(data, fh)


    # with open(filename, 'w') as fh:
        # data = json.dumps(cat._data_python_list)
        # mask = data.replace('NaN', 'null')
        # json.dump(json.loads(mask), fh)



# I'm switching to the below code because the for loop in the above code is skipping over some np.nan/np.inf values.
# Some values in the dict are 2D arrays (e.g. Unc_Flux_History in 3FGL). The code to iterate through every single
# item in this complex data format would be very messy (and would run very slowly), so now I'm doing a string-edit
# of the lists/dicts.

# Using this new code makes these two methods very similar - perhaps they can be merged into one?
def dump_list_to_json(cat, filename):
    with open(filename, 'w') as fh:
        data = json.dumps(cat._data_python_list)
        mask = data.replace('NaN', 'null').replace('-Infinity', 'null').replace('Infinity', 'null')
        json.dump(json.loads(mask), fh)


def dump_dict_to_json(source, filename):
    with open(filename, 'w') as fh:
        data = json.dumps(source._data_python_dict)
        mask = data.replace('NaN', 'null').replace('-Infinity', 'null').replace('Infinity', 'null')
        json.dump(json.loads(mask), fh)
