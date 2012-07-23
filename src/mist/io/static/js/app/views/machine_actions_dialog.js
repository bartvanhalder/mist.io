define('app/views/machine_actions_dialog', [
	'text!app/templates/machine_actions_dialog.html','ember'],
	/**
	 *
	 * Confirmation Dialog
	 *
	 * @returns Class
	 */
	function(machine_actions_dialog_html) {
		return Ember.View.extend({
			tagName: false,
			
			reboot: function(){
				var machines = this.getSelectedMachines();
			    var plural = false;
			    
				if(machines.length == 0){
					return;
				} else if(machines.length > 1){
					plural = true;
				}
				
				Mist.confirmationController.set("title", 'Reboot Machine' + (plural ? 's' : ''));
				
				var names = '';
				
				machines.forEach(function(machine){
					names = names + ' ' + machine.name;
				})
				
				Mist.confirmationController.set("text", 'Are you sure you want to reboot' +
						names +'?');
				Mist.confirmationController.set("callback", function(){
					machines.forEach(function(machine){
						machine.reboot();
					});
				});
				Mist.confirmationController.show();
			},
			
			destroy: function(){
				var machines = this.getSelectedMachines();
			    var plural = false;
			    
				if(machines.length == 0){
					return;
				} else if(machines.length > 1){
					plural = true;
				}
				
				Mist.confirmationController.set("title", 'Destroy Machine' + (plural ? 's' : ''));
				
				var names = '';
				
				machines.forEach(function(machine){
					names = names + ' ' + machine.name;
				})
				
				Mist.confirmationController.set("text", 'Are you sure you want to destroy' +
						names +'?');
				Mist.confirmationController.set("callback", function(){
					machines.forEach(function(machine){
						machine.destroy();
					});
				});
				
				Mist.confirmationController.show();
			},
			
			shutdown: function(){
				var machines = this.getSelectedMachines();
			    var plural = false;
			    
				if(machines.length == 0){
					return;
				} else if(machines.length > 1){
					plural = true;
				}
				
				Mist.confirmationController.set("title", 'Shutdown Machine' + (plural ? 's' : ''));
				
				var names = '';
				
				machines.forEach(function(machine){
					names = names + ' ' + machine.name;
				})
				
				Mist.confirmationController.set("text", 'Are you sure you want to shutdown' +
						names +'?');
				Mist.confirmationController.set("callback", function(){
					machines.forEach(function(machine){
						machine.shutdown();
					});
				});
				
				Mist.confirmationController.show();
			},
			
			getSelectedMachines: function(){
				var machines = [];
			    
				Mist.backendsController.forEach(function(backend){
					backend.machines.forEach(function(machine){
						if(machine.selected){
							machines.push(machine);
						}
					});
				});        
				
				return machines;
			},
			
			init: function() {
				this._super();
				// cannot have template in home.pt as pt complains
				this.set('template', Ember.Handlebars.compile(machine_actions_dialog_html));
			},
		});
	}
);