#!/usr/bin/env bash
. ./.env
echo 'Attempting to insert tables into DPP database at db' 

echo docker exec -t $DB_CONTAINER_NAME mysql -u$TEST_DB_USER -p"$TEST_DB_PASS" -h db -P 3306
# until docker exec -t $DB_CONTAINER_NAME mysql -u$TEST_DB_USER -p$TEST_DB_PASS -h db -P 3306
# do
#   echo "Retrying in 5 seconds..."
#   sleep 5
# done

docker exec -t $DB_CONTAINER_NAME mysql -u$TEST_DB_USER -p"$TEST_DB_PASS" -h db -P 3306 --database "$TEST_DB_NAME" < ./script/init.sql
