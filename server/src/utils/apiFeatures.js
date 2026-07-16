class APIFeatures {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // Search
    search() {

        if (this.queryString.search) {

            this.query = this.query.find({
                fullName: {
                    $regex: this.queryString.search,
                    $options: "i",
                },
            });

        }

        return this;
    }

    // Filter
    filter() {

        let queryObj = { ...this.queryString };

        const removeFields = ["search", "sort", "page", "limit"];
        removeFields.forEach(field => delete queryObj[field]);
        this.query = this.query.find(queryObj);
        return this;
    }

    // Sorting
    sort() {

        if (this.queryString.sort) {

            this.query = this.query.sort(this.queryString.sort);

        } else {

            this.query = this.query.sort("-createdAt");

        }

        return this;
    }

    // Pagination
    paginate(resultPerPage = 5) {

        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.skip(skip).limit(resultPerPage);
        return this;
    }

}

module.exports = APIFeatures;