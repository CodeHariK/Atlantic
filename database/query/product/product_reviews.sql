-- name: CreateProductReview :one
INSERT INTO
    product_reviews (
        id,
        user_id,
        product_id,
        seller_id,
        rating
    )
VALUES ($1, $2, $3, $4, $5) RETURNING id;

-- name: GetProductReviewByID :one
SELECT
    id,
    user_id,
    product_id,
    seller_id,
    rating,
    created_at,
    updated_at
FROM product_reviews
WHERE
    id = $1;

-- name: UpdateProductReview :exec
UPDATE product_reviews
SET
    user_id = $2,
    product_id = $3,
    seller_id = $4,
    rating = $5,
    updated_at = CURRENT_TIMESTAMP
WHERE
    id = $1;

-- name: DeleteProductReview :exec
DELETE FROM product_reviews WHERE id = $1;

-- name: ListProductReviews :many
SELECT
    id,
    user_id,
    product_id,
    seller_id,
    rating,
    created_at,
    updated_at
FROM product_reviews
ORDER BY id
LIMIT $1
OFFSET
    $2;

-- name: CreateProductComment :one
INSERT INTO
    product_comment (id, comment)
VALUES ($1, $2) RETURNING id;

-- name: GetProductCommentByID :one
SELECT id, comment FROM product_comment WHERE id = $1;

-- name: UpdateProductComment :exec
UPDATE product_comment SET comment = $2 WHERE id = $1;

-- name: DeleteProductComment :exec
DELETE FROM product_comment WHERE id = $1;

-- name: ListReviewsWithComments :many
SELECT pr.id, pr.user_id, pr.product_id, pr.seller_id, pr.rating, pr.created_at, pr.updated_at, pc.comment
FROM
    product_reviews pr
    LEFT JOIN product_comment pc ON pr.id = pc.id
WHERE
    pr.product_id = $1
ORDER BY pr.created_at DESC
LIMIT $1
OFFSET
    $2;