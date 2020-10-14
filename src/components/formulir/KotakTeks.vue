<template>
    <div class="form-block">
        <label class="form-label">{{ label }}</label>
        <textarea class="text-form" @input="diubah"></textarea>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        reset: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        diubah(e) {
            this.$emit('berubah', e.target.value)
        }
    }
}
</script>