import os

import numpy as np
from io import BytesIO

from wangyi_hk_.label_map_util import *
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
from PIL import Image
# Path to frozen detection graph. This is the actual model that is used for the object detection.
PATH_TO_FROZEN_GRAPH = '/Users/jinzeng/PycharmProjects/studyPro/wangyi_cc/wangyi_hk_/frozen_inference_graph.pb'

# List of the strings that is used to add correct label for each box.
PATH_TO_LABELS = '/Users/jinzeng/PycharmProjects/studyPro/wangyi_cc/wangyi_hk_/label_map.pbtxt'

NUM_CLASSES = 1
detection_graph = tf.Graph()
with detection_graph.as_default():
	od_graph_def = tf.GraphDef()
	with tf.gfile.GFile(PATH_TO_FROZEN_GRAPH, 'rb',) as fid:
		serialized_graph = fid.read()
		od_graph_def.ParseFromString(serialized_graph)
		tf.import_graph_def(od_graph_def, name='')

label_map = load_labelmap(PATH_TO_LABELS)
categorys = convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
category_index = create_category_index(categorys)

def detection(image_byte):
	with detection_graph.as_default():
		with tf.Session(graph=detection_graph) as sess:
			image = Image.open(BytesIO(image_byte))
			image_np_expanded = np.expand_dims(image, axis=0)
			image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
			boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
			scores = detection_graph.get_tensor_by_name('detection_scores:0')
			classes = detection_graph.get_tensor_by_name('detection_classes:0')
			num_detections = detection_graph.get_tensor_by_name('num_detections:0')

			(boxes, scores, classes, num_detections) = sess.run([boxes, scores, classes, num_detections],feed_dict={image_tensor: image_np_expanded})

			if len(boxes[scores>0.9]) == 0:
				return -1
			posX = int(boxes[scores>0.9][0][1] * 220)
			return posX

if __name__ == '__main__':

	with open('test.jpg','rb') as f:

		t = f.read()
	x = detection(t)

	print(x)