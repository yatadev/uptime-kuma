<template>
    <span :class="className">{{ text }}</span>
</template>

<script>
export default {
    props: {
        status: Number,
        pill: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        color() {
            if (this.status === 0) {
                return "isDown"
            }

            if (this.status === 1) {
                return "isUp"
            }

            if (this.status === 2) {
                return "isWarning"
            }

            return "isSecondary"
        },

        text() {
            if (this.status === 0) {
                return "Down"
            }

            if (this.status === 1) {
                return "Up"
            }

            if (this.status === 2) {
                return "Pending"
            }

            return "Unknown"
        },

        className() {
            return `badge rounded-pill ${this.color}`;
        },
    },
}
</script>

<style scoped>
    span {
        width: 64px;
    }
</style>
