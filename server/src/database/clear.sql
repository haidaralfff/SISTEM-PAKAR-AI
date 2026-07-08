BEGIN;

DELETE FROM audit_logs;
DELETE FROM consultation_details;
DELETE FROM consultations;
DELETE FROM rules;
DELETE FROM symptoms;
DELETE FROM diseases;
DELETE FROM users WHERE email != 'admin@ruangpulih.com';

COMMIT;
