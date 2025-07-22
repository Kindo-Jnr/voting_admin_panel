// src/utils/echartsConfig.js
import * as echarts from 'echarts/core';
import { Geo3DComponent } from 'echarts-gl/components';
import { Scatter3DChart, SurfaceChart } from 'echarts-gl/charts';
import { CanvasRenderer } from 'echarts/renderers';

// Initialize only once
echarts.use([Geo3DComponent, Scatter3DChart, SurfaceChart, CanvasRenderer]);

export default echarts;