use shared::domain::meta::{
    Affiliation, AffiliationId, AgeRange, AgeRangeId, ContentType, ContentTypeId, MetaKind, Style,
    StyleId, Subject, SubjectId,
};
use sqlx::{postgres::PgDatabaseError, PgPool};
use uuid::Uuid;

pub async fn get_style(db: &PgPool) -> sqlx::Result<Vec<Style>> {
    sqlx::query_as!(
        Style,
        r#"select id as "id: StyleId", display_name, created_at, updated_at from style"#
    )
    .fetch_all(db)
    .await
}

pub async fn get_age_ranges(db: &PgPool) -> sqlx::Result<Vec<AgeRange>> {
    sqlx::query_as!(
        AgeRange,
        r#"select id as "id: AgeRangeId", display_name, created_at, updated_at from age_range"#
    )
    .fetch_all(db)
    .await
}

pub async fn get_affiliations(db: &PgPool) -> sqlx::Result<Vec<Affiliation>> {
    sqlx::query_as!(
        Affiliation,
        r#"select id as "id: AffiliationId", display_name, created_at, updated_at from affiliation"#
    )
    .fetch_all(db)
    .await
}

pub async fn get_subjects(db: &PgPool) -> sqlx::Result<Vec<Subject>> {
    sqlx::query_as!(
        Subject,
        r#"select subject_id as "id: SubjectId", display_name, created_at, updated_at from subject"#
    )
    .fetch_all(db)
    .await
}

pub async fn get_content_types(db: &PgPool) -> sqlx::Result<Vec<ContentType>> {
    sqlx::query_as!(
        ContentType,
        r#"select content_type_id as "id: ContentTypeId", display_name, created_at, updated_at from "content_type""#
    )
    .fetch_all(db)
    .await
}

// attempts to grab a uuid out of a string in the shape:
// Key (<key>)=(<uuid>)<postfix>
fn extract_uuid(s: &str) -> Option<Uuid> {
    // <uuid>)<postfix)
    let s = s.split("(").nth(2)?;
    let s = &s[0..s.find(")")?];
    s.parse().ok()
}

pub enum MetaWrapperError {
    Sqlx(sqlx::Error),
    MissingMetadata { id: Option<Uuid>, kind: MetaKind },
}

pub fn handle_metadata_err(err: sqlx::Error) -> MetaWrapperError {
    let db_err = match &err {
        sqlx::Error::Database(e) => e.downcast_ref::<PgDatabaseError>(),
        _ => return MetaWrapperError::Sqlx(err),
    };

    let id = db_err.detail().and_then(extract_uuid);

    let kind = match db_err.constraint() {
        Some("image_affiliation_affiliation_id_fkey") => MetaKind::Affiliation,
        Some("image_age_range_age_range_id_fkey") => MetaKind::AgeRange,
        Some("image_style_style_id_fkey") => MetaKind::Style,
        Some("image_category_category_id_fkey") => MetaKind::Category,
        Some("jig_content_type_content_type_id_fkey") => MetaKind::ContentType,

        _ => return MetaWrapperError::Sqlx(err),
    };

    MetaWrapperError::MissingMetadata { id, kind }
}
