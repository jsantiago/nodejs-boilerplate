Vagrant.configure("2") do |config|

    config.vm.box = "ubuntu/trusty64"

    config.vm.network :forwarded_port, guest: 80, host: 8000
    config.vm.synced_folder "sites-enabled", "/etc/nginx/sites-enabled"

    config.vm.provision "shell", path: "install.sh"

    config.vm.provider "virtualbox" do |v|
        v.destroy_unused_network_interfaces = true
        v.memory = 2048
        v.cpus = 4
    end

end
