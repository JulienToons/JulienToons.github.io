
window.addEventListener("load", function(event) {
	"use strict";
	
	import java.util.ArrayList;
	import java.util.Random;

	class Neuron {
		public double value;
		public ArrayList<Double> weights;
	}

	class Layer {
		public ArrayList<Neuron> neurons;

		public Layer(int size) {
			// Initialize each neuron in the layer
			neurons = new ArrayList<Neuron>();
			for (int i = 0; i < size; i++) {
				Neuron neuron = new Neuron();
				neuron.weights = new ArrayList<Double>();
				neurons.add(neuron);
			}
		}
	}

	class Network {
		public ArrayList<Layer> layers;

		public Network() {
			layers = new ArrayList<Layer>();
		}

		public void print() {
			int max = 0;
			for (Layer layer : layers)
				max = Math.max(layer.neurons.size(), max);

			for (int i = 0; i < max; i++) {
				for (Layer layer : layers) {
					if (i < layer.neurons.size()) {
						System.out.print(layer.neurons.get(i).value + "   ");
					}
					else {
						System.out.print("      ");
					}
				}
				System.out.print("\n");
			}
		}

		public void addLayer(int size) {
			layers.add(new Layer(size));

			// Generating random weights
			if (layers.size() > 1) {
				int prevLayerSize = layers.get(layers.size() - 2).neurons.size();
				for (Neuron neuron : layers.get(layers.size() - 1).neurons) {
					for (int i = 0; i < prevLayerSize; i++) {
						neuron.weights.add(1.0 - Math.random());
						//neuron.weights.add(0.5);
					}
				}
			}
		}

		public void feedForward() {
			// Loop through each layer skipping the first
			for (int i = 1; i < layers.size(); i++) {
				// Loop through each neuron in the current layer
				for (Neuron neuron : layers.get(i).neurons) {
					// Weighted sum
					neuron.value = 0.0;
					for (int j = 0; j < layers.get(i - 1).neurons.size(); j++) {
						neuron.value += layers.get(i - 1).neurons.get(j).value * neuron.weights.get(j);
					}

					// Activation function
					neuron.value = 1.0 / (1.0 + Math.exp(-neuron.value));
				}
			}
		}
	}

	class Neural {
		public static void main(String args[]) {
			Network network = new Network();
			network.addLayer(2);
			network.addLayer(3);
			network.addLayer(1);

			network.print();

			network.layers.get(0).neurons.get(0).value = 1.0;
			network.layers.get(0).neurons.get(1).value = 1.0;

			network.print();

			network.feedForward();

			network.print();
		}
	}

});