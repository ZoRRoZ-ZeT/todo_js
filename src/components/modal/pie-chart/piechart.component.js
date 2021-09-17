import { getAngle } from '../../../utils/calculations';
import { LightenDarkenColor } from '../../../utils/color-transforming';

class PieChartComponent {
  constructor() {
    this.dataSet = [];
    this.hoveredObject = {
      sector: null,
      color: null,
    };
    this.initialize();
  }

  /* Initializing */
  initPieChartCircle() {
    this.pieChartCircle = document.createElement('div');
    this.pieChartCircle.classList.add('pie-chart');

    this.wrapper.appendChild(this.pieChartCircle);
  }

  initPieChartHover() {
    this.pieChartHover = document.createElement('div');
    this.pieChartHover.classList.add('pie-chart-hover');

    this.wrapper.appendChild(this.pieChartHover);
  }

  initTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.classList.add('tooltip');

    this.wrapper.appendChild(this.tooltip);
  }

  initialize() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');

    this.initPieChartCircle();
    this.initPieChartHover();
    this.initTooltip();
    this.initializeComponent();
  }

  /* Updating */

  updateDataSet(dataSet) {
    this.dataSet = dataSet;
  }

  updateColor() {
    let gradient = '';

    this.dataSet.forEach((sector) => {
      if (sector === this.hoveredObject.sector) {
        gradient += `${this.hoveredObject.color} ${sector.start}% ${sector.end}%,`;
      } else {
        gradient += `${sector.color} ${sector.start}% ${sector.end}%,`;
      }
    });
    gradient = gradient.slice(0, gradient.length - 1);
    this.pieChartCircle.style.background = `conic-gradient(${gradient})`;
  }

  updateTooltipPos(mousePos) {
    const rect = this.tooltip.getClientRects()[0];

    const left = mousePos.x - rect.width / 2 + 10;
    const top = mousePos.y - rect.height;

    this.tooltip.style.left = `${left}px`;
    this.tooltip.style.top = `${top}px`;
  }

  updateTooltipText(sector) {
    this.tooltip.innerHTML = `
      ${sector.value}/${sector.total} (${Math.floor(
      (sector.value / sector.total) * 100
    )}%)`;
  }

  /* Render */
  drawHover(sector) {
    this.hoveredObject.sector = sector;
    this.hoveredObject.color = LightenDarkenColor(sector.color, 30);

    this.updateTooltipText(this.hoveredObject.sector);
    this.updateColor();

    this.pieChartHover.style.backgroundImage = `conic-gradient(
      transparent 0% ${sector.start}%, 
      ${this.hoveredObject.color} ${sector.start}% ${sector.end}%, 
      transparent ${sector.end}% 100%)`;
    this.pieChartHover.style.width = '220px';
    this.pieChartHover.style.height = '220px';
  }

  initializeComponent() {
    this.pieChartCircle.addEventListener('mousemove', (event) => {
      this.tooltip.style.visibility = 'visible';
      const rect = this.pieChartCircle.getClientRects()[0];
      const radius = rect.width / 2;

      const pointOnCircle = {
        x: event.x - rect.x - radius,
        y: event.y - rect.y - radius,
      };

      const angleFromMouse = getAngle(pointOnCircle);
      this.updateTooltipPos({ x: event.x - rect.x, y: event.y - rect.y });
      this.dataSet.forEach((sector) => {
        const startAngle = (360 * sector.start) / 100;
        const endAngle = (360 * sector.end) / 100;

        if (angleFromMouse >= startAngle && angleFromMouse <= endAngle) {
          if (
            this.hoveredObject.sector &&
            this.hoveredObject.sector !== sector
          ) {
            this.pieChartHover.style.width = '200px';
            this.pieChartHover.style.height = '200px';

            this.pieChartHover.addEventListener('ontransitionend', () => {
              if (this.hoveredObject.sector === null) {
                return;
              }
              this.drawHover(sector);
            });
            return;
          }

          this.drawHover(sector);
        }
      });
    });

    this.pieChartCircle.addEventListener('mouseleave', () => {
      this.tooltip.style.visibility = 'hidden';
      this.pieChartHover.ontransitionend = () => {
        this.hoveredObject.sector = null;
        this.updateColor();
        this.pieChartHover.ontransitionend = null;
      };
      this.pieChartHover.style.width = '200px';
      this.pieChartHover.style.height = '200px';
    });
  }

  getHtmlComponent() {
    return this.wrapper;
  }
}

export default PieChartComponent;
