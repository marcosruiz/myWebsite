# Chirihop's webpage

## Start up
Go to `/config/dev` and execute these two lines to start cassandra database:
```
docker-compose up -d
docker run -it --network dev_cassandra --rm cassandra cqlsh dev_cassandra_1
```