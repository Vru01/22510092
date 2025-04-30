1) Pull the Cassandra Docker Image:
        docker pull cassandra

2) Run Cassandra in a Docker Container:
        docker run --name cassandra-container -d -p 9042:9042 cassandra

3) Verify Cassandra is Running:
        docker ps

4) Assess cassandra shell:
        docker exec -it cassandra-container cqlsh




