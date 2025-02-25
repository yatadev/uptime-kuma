const PrometheusClient = require('prom-client');

const commonLabels = [
    'monitor_name',
    'monitor_type',
    'monitor_url',
    'monitor_hostname',
    'monitor_port',
]

const monitor_response_time = new PrometheusClient.Gauge({
    name: 'monitor_response_time',
    help: 'Monitor Response Time (ms)',
    labelNames: commonLabels
});

const monitor_status = new PrometheusClient.Gauge({
    name: 'monitor_status',
    help: 'Monitor Status (1 = UP, 0= DOWN)',
    labelNames: commonLabels
});

class Prometheus {
    monitorLabelValues = {}

    constructor(monitor) {
        this.monitorLabelValues = {
            monitor_name: monitor.name,
            monitor_type: monitor.type,
            monitor_url: monitor.url,
            monitor_hostname: monitor.hostname,
            monitor_port: monitor.port
        }
    }

    update(heartbeat) {
        try {
            monitor_status.set(this.monitorLabelValues, heartbeat.status)
        } catch (e) {
            console.error(e)
        }

        try {
            if (typeof heartbeat.ping === 'number') {
                monitor_response_time.set(this.monitorLabelValues, heartbeat.ping)
            } else {
                // Is it good?
                monitor_response_time.set(this.monitorLabelValues, -1)
            }
        } catch (e) {
            console.error(e)
        }
    }

}

module.exports = {
    Prometheus
}
