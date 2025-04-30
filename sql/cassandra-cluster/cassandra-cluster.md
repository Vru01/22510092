1) Create cluster:
    - docker-compose up -d

2) verify:
    - docker-compose ps

3) Ip address:
    - docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_name>

4) update ect->cassandra->cassandra.yml:
    seed_provider:
     - seeds:"<list-dowm-all-ips-of-cluster-instace-nodes>"

5) Execute docker instance:
    -docker exec -it cassandra-node1 cqlsh