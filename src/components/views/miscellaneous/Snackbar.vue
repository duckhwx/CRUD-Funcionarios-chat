<template>
	<!-- Componente snackbar que será utilizado em outros componentes -->
    <v-snackbar
    top
    right
    v-model="snackbar"
    :color="snackbarPresets.color">
        {{snackbarPresets.message}}
        <v-btn
            text
            @click="snackbar = false"
        >
         <v-icon
         dark>
             fas fa-times
         </v-icon>
        </v-btn>
    </v-snackbar>
</template>
<script>
export default {
	name: 'Snackbar',
	props: {
		trigger: {
			type: Boolean,
			required: true
		},
		snackbarPresets: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			snackbar: false
		}
	},
	watch: {
		trigger () {
			if (this.trigger) {
				// ativação do snackbar
				this.snackbar = true;
			}
		},
		snackbar () {
			if (!this.snackbar) {
				// informa ao componente pai que o snackbar foi fechado e deve ser resetado
				this.$emit('resetSnackbar');
			}
		}
	}
}
</script>
<style scoped>

</style>
