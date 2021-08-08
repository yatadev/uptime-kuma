<template>
    <span :class="className">{{ uptime }}</span>
</template>

<script>
export default {
    props: {
        monitor: Object,
        type: String,
        pill: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        uptime() {

            let key = this.monitor.id + "_" + this.type;

            if (this.$root.uptimeList[key] !== undefined) {
                return Math.round(this.$root.uptimeList[key] * 10000) / 100 + "%";
            }

            return "N/A"
        },

        color() {
            if (this.lastHeartBeat.status === 0) {
                return "isDown"
            }

            if (this.lastHeartBeat.status === 1) {
                return "isUp"
            }

            if (this.lastHeartBeat.status === 2) {
                return "isWarning"
            }

            return "isSecondary"
        },

        lastHeartBeat() {
            if (this.monitor.id in this.$root.lastHeartbeatList && this.$root.lastHeartbeatList[this.monitor.id]) {
                return this.$root.lastHeartbeatList[this.monitor.id]
            }

            return {
                status: -1,
            }
        },

        className() {
            if (this.pill) {
                return `badge rounded-pill ${this.color}`;
            }

            return "";
        },
    },
}
</script>

<style>
.badge {
    min-width: 62px;
}
</style>
