<template>
<!-- componente que instancia um Dialog especifico pra deletes -->
    <v-dialog
    v-model="dialog"
		width="40%">
			<v-card
			class="px-3"
			height="167px">
				<v-card-title>
					<span
					class="headline">
						{{dialogPresets.title}}
					</span>
				</v-card-title>
				<v-divider
				class="mb-4"
				color="grey"></v-divider>
				<v-layout>
					<span
					class="pl-5 title">
						{{dialogPresets.message}}
					</span>
				</v-layout>
				<v-layout
				class="mt-3"
				justify-end>
					<v-btn
					color="red darken-4"
					class="white--text"
					@click="emitDeleteConfirmation(dialogPresets.userId)">
						Excluir
					</v-btn>
				</v-layout>
			</v-card>
    </v-dialog>
</template>
<script>
export default {
	name: 'DialogDelete',
	props: {
		trigger: {
			type: Boolean,
			required: true
		},
		dialogPresets: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			dialog: false
		}
	},
	methods: {
		// informa ao componente pai que o dialog foi fechado
		emitDeleteConfirmation ($id) {
			this.dialog = false;
			this.$emit('deleteFunc', $id);
		}
	},
	watch: {
		trigger () {
			if (this.trigger) {
				this.dialog = true;
			}
		},
		dialog () {
			if (!this.dialog) {
				this.$emit('resetDialog');
			}
		}
	}
}
</script>
<style scoped>

</style>
