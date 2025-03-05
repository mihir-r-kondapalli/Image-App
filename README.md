# Space Image Generator

A web application for generating simulated space images by adjusting various parameters. This tool allows astronomers and space enthusiasts to create and visualize scattered light disks around exoplanets with customizable parameters.

## Features

- **Interactive Parameter Adjustment**: Modify disk parameters, SPF parameters, PSF choice, and parallactic angles to generate custom space images
- **Real-time Image Generation**: Instantly visualize the effects of parameter changes
- **Parameter Presets**: Save and load parameter configurations for easy reuse
- **Image Comparison**: View and compare different generated images in a gallery
- **Image Download**: Download generated images for use in publications or presentations
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js 15.2.1, React 19, TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: Custom components with animations
- **Image Processing**: Backend Python API with JAX for accelerated computations

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/space-image.git
cd space-image
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Backend Setup

The application requires a backend API for image generation. The backend is built with Python and uses JAX for accelerated computations.

1. Navigate to the `image-api` directory:
```bash
cd image-api
```

2. Set up the Python environment:
```bash
conda env create -f environment.yml
conda activate space-image
```

3. Start the backend server:
```bash
python manage.py runserver
```

## Usage

1. **Adjust Parameters**: Use the left sidebar to modify parameters for the space image
2. **Generate Image**: Click the "Generate Image" button to create a new image with the current parameters
3. **Save Parameters**: Enter a name and click "Save Parameters" to store the current configuration
4. **Load Parameters**: Click on a saved parameter set in the right panel to load it
5. **Download Image**: After generating an image, click the "Download" button to save it to your device
6. **Compare Images**: Navigate to the "Comparison" page to view and compare different generated images

## Project Structure

- `/app`: Next.js app directory containing pages and layouts
- `/components`: React components used throughout the application
- `/public`: Static assets including images
- `/types`: TypeScript type definitions
- `/image-api`: Backend API for image generation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Based on the GRaTeR-JAX framework from the UCSB Exoplanet Polarimetry Lab
- Uses astronomical data and models for accurate space image generation
